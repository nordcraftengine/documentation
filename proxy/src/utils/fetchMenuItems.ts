import type {
  FetchMenuItems,
  GetMenuItemsFromRepoItems,
  MenuItem,
  RepositoryItem,
} from '../types'
import {
  getFilePath,
  getLocalFilePath,
  getNameFromFilename,
  getSlugFromFilename,
} from './helpers'

export const fetchMenuItems = async ({
  owner,
  repository,
  branch,
}: FetchMenuItems) => {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'CF',
  }

  // eslint-disable-next-line no-useless-catch
  try {
    const url = `https://api.github.com/repos/${owner}/${repository}/git/trees/${branch}?recursive=1`
    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(
        `Could not fetch repo content. Status: ${response.status}`,
      )
    }

    const repositoryData = (await response.json()) as { tree: RepositoryItem[] }

    const relevantItems = repositoryData.tree.filter((item) => {
      return item.path.startsWith('docs/') // The call will give us all items in the repo. We only need the ones in docs/
    })

    return getMenuItemsFromRepoItems({
      items: relevantItems,
      parentPath: 'docs',
      owner,
      repository,
      branch,
    })
  } catch (err) {
    throw err
  }
}

export const getMenuItemsFromRepoItems = ({
  items,
  parentPath: _parentPath,
  owner,
  repository,
  branch,
}: GetMenuItemsFromRepoItems): MenuItem[] => {
  return items
    .filter(({ path, type }) => {
      const pathParts = path.split('/')
      pathParts.pop()
      const parentPath = pathParts.join('/')

      return type === 'tree' && parentPath === _parentPath
    })
    .map(({ path, type: _type }) => {
      const fileName = path.split('/')[path.split('/').length - 1]
      const hasIndexFile = items.find(
        (item) => item.path === path + '/index.md',
      )
      const type = hasIndexFile ? 'file' : 'folder'

      if (type === 'folder') {
        const children: MenuItem[] = getMenuItemsFromRepoItems({
          items,
          parentPath: path,
          owner,
          repository,
          branch,
        })

        return {
          type,
          name: getNameFromFilename(fileName),
          id: getSlugFromFilename(fileName),
          children,
        }
      }

      return {
        type: 'file',
        name: getNameFromFilename(fileName),
        id: getSlugFromFilename(fileName),
        localPath: getLocalFilePath({ path: path + '/index.md' }),
        contributorsPath: getLocalFilePath({
          path: path + '/index.json',
        }).replace('/docs/', '/contributors/'),
        path: getFilePath({
          owner,
          repository,
          branch,
          path: path + '/index.md',
        }),
      }
    })
}
