import type { FetchMenuItems, MenuItem, MenuItemsStructure } from '../types'
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
      items: repositoryData,
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
  items: MenuItemsStructure
  parentPath: string
  owner: string
  repository: string
  branch: string
}): MenuItem[] => {
  return items.map(({ path, label, children }) => {
    if (children && children.length > 0) {
      const childItems: MenuItem[] = children.map((child) => {
        const childPath = `${path}/${child.path}`
        return {
          type: 'file',
          name: child.label,
          id: child.label.toLocaleLowerCase().replaceAll(' ', '-'),
          localPath: getLocalFilePath({ path: `docs/${childPath}/index.md` }),
          contributorsPath: getLocalFilePath({
            path: `contributors/${childPath}/index.json`,
          }).replace('/docs/', '/contributors/'),
          path: getFilePath({
            owner,
            repository,
            branch,
            path: `docs/${childPath}/index.md`,
          }),
        }
      })
      return {
        type: 'folder',
        name: label,
        id: label.toLocaleLowerCase().replaceAll(' ', '-'),
        children: childItems,
      }
    } else {
      return {
        type: 'file',
        name: label,
        id: label.toLocaleLowerCase().replaceAll(' ', '-'),
        localPath: getLocalFilePath({ path: `docs/${path}/index.md` }),
        contributorsPath: getLocalFilePath({
          path: `contributors/${path}/index.json`,
        }).replace('/docs/', '/contributors/'),
        path: getFilePath({
          owner,
          repository,
          branch,
          path: `docs/${path}/index.md`,
        }),
      }
    }
  })
}
