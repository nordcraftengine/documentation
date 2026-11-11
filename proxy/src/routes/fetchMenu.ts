import type { FetchMenu, MenuItem } from '../types'
import { errorResponse, fetchMenuItems, json, preferLocalData } from '../utils'
import { loadJsonFile } from '../utils/jsonLoader'

// URLs like: http://localhost:9000/menu/nordcraftengine/documentation/main
export const fetchMenu = async ({
  params: { owner, repository, branch },
}: FetchMenu) => {
  const preferLocalMenu = preferLocalData({ owner, repository, branch })

  try {
    const menu = preferLocalMenu
      ? await loadJsonFile<MenuItem[]>('./menuItems.json')
      : await fetchMenuItems({ owner, repository, branch })

    if (!menu) {
      throw new Error('Could not fetch menu items.')
    }

    return json(
      { menu },
      {
        headers: {
          'Cache-Control': `public, max-age=${10 * 60}`,
          ...(preferLocalMenu
            ? { 'CDN-Cache-Control': `public, max-age=${24 * 60 * 60}` }
            : {}),
        },
      },
    )
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    return errorResponse('Could not fetch menu items', { status: 500 })
  }
}
