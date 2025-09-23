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

/**
 * Replace all non-letters/numbers with dashes and convert to lowercase
 */
export const kebabCase = (str: string) =>
  str.replaceAll(/[^a-zA-Z0-9]+/g, '-').toLowerCase()

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunkedArr: T[][] = []
  let index = 0
  while (index < array.length) {
    chunkedArr.push(array.slice(index, index + size))
    index += size
  }
  return chunkedArr
}
