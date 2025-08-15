import type { GetFilePath, PreferLocalData } from '../types'

export const getFilePath = ({
  owner,
  repository,
  branch,
  path,
}: GetFilePath) => {
  return `https://raw.githubusercontent.com/${owner}/${repository}/refs/heads/${branch}/${path}`
}

export const getLocalFilePath = ({ path }: { path: string }) => {
  return `./${path}`
}

export const preferLocalData = ({
  owner,
  repository,
  branch,
}: PreferLocalData) => {
  return (
    owner === 'nordcraftengine' &&
    repository === 'documentation' &&
    branch === 'main'
  )
}
