import * as fs from 'fs'
import { getMenuItemsFromRepoItems } from '../src/utils'
import { includeActions } from './libReferences/actions/actions'
import { includeFormulas } from './libReferences/formulas/formulas'

interface MenuItemStructure {
  path: string
  label: string
}

export type MenuItemsStructure = Array<
  MenuItemStructure & { children?: Array<MenuItemStructure> }
>

// Setup
if (fs.existsSync('./dist/docs')) {
  fs.rmdirSync('./dist/docs', { recursive: true })
}
if (!fs.existsSync('./dist')) {
  fs.mkdirSync('./dist')
}
fs.mkdirSync('./dist/docs')
// Copy over all markdown files + folders
fs.cpSync('../docs', './dist/docs', {
  recursive: true,
  filter: (src) => !src.endsWith('.webp') && !src.endsWith('.json'),
})
// Inject formulas into the formula reference file
const formulaReferencePath = './dist/docs/references/formulas/index.md'
const formulaReferenceContent = fs.readFileSync(formulaReferencePath, 'utf-8')
const newFormulaContent = await includeFormulas(formulaReferenceContent)
fs.writeFileSync(formulaReferencePath, newFormulaContent, 'utf-8')
// Inject actions into the actions reference file
const actionReferencePath = './dist/docs/references/actions/index.md'
const actionReferenceContent = fs.readFileSync(actionReferencePath, 'utf-8')
const newActionContent = await includeActions(actionReferenceContent)
fs.writeFileSync(actionReferencePath, newActionContent, 'utf-8')
// Structure that holds the order of all menu items/content
const structure = JSON.parse(
  fs.readFileSync('../docs/index.json', 'utf-8'),
) as MenuItemsStructure

// Read all files and sort them according to the structure from docs/index.json
const files = (
  fs.readdirSync('./dist/docs', { recursive: true }) as string[]
).sort((a, b) => {
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
const getLabel = (path: string) => {
  const parts = path.split('/')
  const folder = structure.find((item) => item.path === parts[0])
  if (!folder) {
    // eslint-disable-next-line no-console
    console.warn(`Folder ${parts[0]} not found in structure`)
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
// Create menu items structure
const menuItems = getMenuItemsFromRepoItems({
  items: files.map((file) => ({
    path: `docs/${file}`,
    type: 'tree',
    label: getLabel(file),
  })),
  parentPath: 'docs',
  owner: 'nordcraftengine',
  repository: 'documentation',
  branch: 'main',
})
// Save the menu structure to a JSON file
fs.writeFileSync(
  './dist/menuItems.json',
  JSON.stringify(menuItems, null, 2),
  'utf-8',
)
