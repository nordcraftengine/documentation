import * as fs from 'fs'
import { chunk } from 'lodash'
import { fetchContributors } from './fetchContributors'

interface CommitAuthor {
  avatar_url?: string
  login?: string
}

if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}
if (fs.existsSync('./dist/contributors')) {
  // eslint-disable-next-line no-console
  console.log('Contributors already exist - skipping contributor setup')
  process.exit()
}
fs.mkdirSync('./dist/contributors')
// Copy over all markdown files + folders
fs.cpSync('../docs', './dist/contributors', {
  recursive: true,
  filter: (src) => !src.endsWith('.webp'),
})
// Read all files
const files = (
  fs.readdirSync('./dist/contributors', { recursive: true }) as string[]
).filter((path) => path.endsWith('.md'))
const chunks = chunk(files, 10)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const contributorMapFile = fs.readFileSync('./contributors.json', 'utf-8')
const contributorMap = (
  JSON.parse(contributorMapFile) as Array<{
    email: string
    username: string
    ignored?: boolean
  }>
).filter((contributor) => !contributor.ignored)
const getGitHubUser = async (username: string) => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'CF',
  }
  if (process.env.COMMITS_KEY) {
    headers.Authorization = `Bearer ${process.env.COMMITS_KEY}`
  }
  const response = await fetch(`https://api.github.com/users/${username}`, {
    headers,
  })
  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user: ${response.statusText}`)
  }
  return response.json() as Promise<CommitAuthor>
}
const allContributors = await Promise.all(
  contributorMap.map(async (contributor) => {
    try {
      const user = await getGitHubUser(contributor.username)
      if (user.avatar_url) {
        return {
          ...contributor,
          avatar: user.avatar_url,
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `Failed to fetch GitHub user for ${contributor.username}:`,
        error,
      )
    }
    return contributor
  }),
)
for (const c of chunks) {
  await Promise.all(
    c.map(async (path) => {
      const fileContributors = await fetchContributors({
        path: `docs/${path}`,
        allContributors,
      })
      if (fileContributors) {
        fs.writeFileSync(
          './dist/contributors/' + path.replace('.md', '.json'),
          JSON.stringify(fileContributors, null, 2),
          'utf-8',
        )
      }
      // Remove the .md file again
      fs.rmSync('./dist/contributors/' + path)
    }),
  )
  await sleep(250)
}
