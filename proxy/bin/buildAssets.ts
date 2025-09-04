import * as fs from 'fs'
import { getMenuItemsFromRepoItems } from '../src/utils'
import { getStructure } from './fileTree'
import { includeActions } from './libReferences/actions/actions'
import { includeFormulas } from './libReferences/formulas/formulas'

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

const structure = getStructure()
// Create menu items structure
const menuItems = getMenuItemsFromRepoItems({
  items: structure,
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
