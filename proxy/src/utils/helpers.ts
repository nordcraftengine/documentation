import { kebabCase, startCase, toLower, upperFirst } from 'lodash'
import type { GetFilePath, PreferLocalData } from '../types'

export const getFilename = (fileName: string) => {
  const fileNameWithoutExtension = fileName.split('.')[0]
  return fileNameWithoutExtension.replace(/^\d{2}-/, '')
}

export const getNameFromFilename = (fileName: string) => {
  const fileNameWithoutExtension = fileName.split('.')[0]
  const lowerCase = toLower(startCase(getFilename(fileNameWithoutExtension)))
  return upperFirst(lowerCase)
    .replaceAll('nordcraft', 'Nordcraft')
    .replaceAll('cms', 'CMS')
    .replaceAll('api', 'API')
    .replaceAll('ai', 'AI')
}

export const getSlugFromFilename = (fileName: string) => {
  const fileNameWithoutExtension = fileName.split('.')[0]
  return kebabCase(getFilename(fileNameWithoutExtension))
}

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
