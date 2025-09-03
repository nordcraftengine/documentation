import type {
  FetchMenuItems,
  MenuItem,
  MenuItemsStructure,
  RepositoryItem,
} from '../types'
import { getFilePath, getLocalFilePath } from './helpers'

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
    // Fetch the menu structure file from the repository
    const url = `https://raw.githubusercontent.com/${owner}/${repository}/refs/heads/${branch}/docs/index.json`
    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(
        `Could not fetch repo content. Status: ${response.status}, URL: ${url}`,
      )
    }

    const repositoryData = (await response.json()) as MenuItemsStructure

    return getMenuItemsFromRepoItems({
      items: repositoryData.map((item) => ({
        path: item.path,
        type: 'tree',
        label: item.label,
      })),
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
}: {
  items: RepositoryItem[]
  parentPath: string
  owner: string
  repository: string
  branch: string
}): MenuItem[] => {
  return items
    .filter(({ path, type }) => {
      const pathParts = path.split('/')
      pathParts.pop()
      const parentPath = pathParts.join('/')

      return type === 'tree' && parentPath === _parentPath
    })
    .map(({ path, type: _type, label }) => {
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
          name: label,
          id: label.toLocaleLowerCase().replaceAll(' ', '-'),
          children,
        }
      }

      return {
        type: 'file',
        name: label,
        id: label.toLocaleLowerCase().replaceAll(' ', '-'),
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
