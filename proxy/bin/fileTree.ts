import * as fs from 'fs'
import type { MenuItemsStructure } from '../src/types'

// Structure that holds the order of all menu items/content
const structure = JSON.parse(
  fs.readFileSync('../docs/index.json', 'utf-8'),
) as MenuItemsStructure

export const getStructure = () => structure

export const sortFilesByStructure = (files: string[]) =>
  files.sort((a, b) => {
    const aParts = a.split('/')
    const bParts = b.split('/')
    const getIndexString = (parts: string[]) => {
      const folderIndex = structure.findIndex((item) => item.path === parts[0])
      if (folderIndex === -1) {
        // eslint-disable-next-line no-console
        console.warn(`Folder ${parts[0]} not found in structure`)
        throw new Error(`Folder ${parts[0]} not found in index.json`)
      }
      const folderKey = `${folderIndex}`.padStart(3, '0')

      if (parts.length > 1 && parts[1] !== 'index.md') {
        const childIndex = structure[folderIndex].children?.findIndex(
          (item) => item.path === parts[1],
        )
        if (childIndex === -1) {
          // eslint-disable-next-line no-console
          console.warn(`Child path ${parts[1]} not found in folder ${parts[0]}`)
          throw new Error(
            `Child path ${parts[1]} not found in folder ${parts[0]}`,
          )
        }
        const childKey = `${childIndex}`.padStart(3, '0')
        return `${folderKey}.${childKey}`
      }
      return `${folderKey}`
    }
    return getIndexString(aParts).localeCompare(getIndexString(bParts))
  })

export const getFileLabel = (path: string) => {
  const parts = path.split('/')
  const folder = structure.find((item) => item.path === parts[0])
  if (!folder) {
    // eslint-disable-next-line no-console
    console.warn(`Folder ${parts[0]} not found in structure`, 'path', path)
    throw new Error(`Folder ${parts[0]} not found in index.json`)
  }
  if (parts.length > 1 && parts[1] !== 'index.md') {
    const child = folder.children?.find((item) => item.path === parts[1])
    if (!child) {
      // eslint-disable-next-line no-console
      console.warn(`Child path ${parts[1]} not found in folder ${parts[0]}`)
      throw new Error(`Child path ${parts[1]} not found in folder ${parts[0]}`)
    }
    return child.label
  }
  return folder.label
}
