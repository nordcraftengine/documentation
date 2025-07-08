import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execPromise = promisify(exec)

const headers: Record<string, string> = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'CF',
}

if (process.env.COMMITS_KEY) {
  headers.Authorization = `Bearer ${process.env.COMMITS_KEY}`
}

export const fetchContributors = async ({
  allContributors,
  path,
}: {
  allContributors: Array<{
    email: string[]
    username: string
    avatar?: string
  }>
  path: string
}) => {
  const { stdout: rawContributors } = await execPromise(
    // List all contributors to the file, sorted by email
    // Count the number of commits per email
    // Use --follow to track commits across file renames
    `git log --format="<%ae>" --follow ../${path} | sort | uniq -c`,
  )
  const fileContributors = rawContributors
    .split('\n')
    .filter((line) => typeof line === 'string' && line.length > 0)
    .map((line) => {
      const [, count, email] = line.trim().match(/(\d+)\s+<(.+)>/) ?? []
      return { count: Number(count), email }
    })
    .filter((c) => typeof c.email === 'string' && c.email.length > 0)
    .sort((a, b) => b.count - a.count)

  const { stdout: lastEditedAt } = await execPromise(
    // Get the last edited date of the file in ISO format
    `git log -1 --format="%ad" --date=iso ../${path}`,
  )
  const matchContributor = (email: string) => {
    return allContributors.find((c) => c.email.includes(email))
  }
  return {
    contributors: fileContributors
      .map(({ email }) => {
        const contributor = matchContributor(email)
        if (contributor) {
          return {
            username: contributor.username,
            avatar: contributor.avatar,
          }
        }
      })
      .filter(Boolean),
    lastEditedAt: lastEditedAt.trim(),
  }
}
