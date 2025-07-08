import { readFileSync } from 'fs'
import { exec } from 'node:child_process'
import { exit } from 'node:process'
import { promisify } from 'node:util'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resolvePath = (...segments: string[]) =>
  path.resolve(__dirname, ...segments)

const execPromise = promisify(exec)

export default async function checkContributors() {
  const declaredContributors = readFileSync(
    resolvePath('..', 'contributors.json'),
    'utf-8',
  )
  const contributors = JSON.parse(declaredContributors) as Array<{
    email: string
    username: string
  }>
  const contributorEmails = new Set(contributors.flatMap((c) => c.email))
  const { stdout: allContributors, stderr } = await execPromise(
    'git log --format="%ae" | sort | uniq',
  )
  if (stderr) {
    // eslint-disable-next-line no-console
    console.error('Error fetching contributors:', stderr)
    exit(1)
    return
  }
  allContributors.split('\n').forEach((email) => {
    if (email.length > 0 && !contributorEmails.has(email)) {
      // eslint-disable-next-line no-console
      console.error(
        `Contributor with email ${email} is not declared in contributors.json`,
      )
      exit(1)
    }
  })
}

void checkContributors()
