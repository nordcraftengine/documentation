---
title: Element tree
description: Understand the Nordcraft element tree for structural editing, element selection, context menus, and adding new elements to your project hierarchy.
---

# Element tree

The element tree provides a structural overview of your project, displaying all HTML elements and Nordcraft components in your page or component hierarchically.

![An expanded view of the HTML element tree, showing an array of HTML elements and Nordcraft components in a hierarchical structure.|16/9](element-tree.webp 'Element tree'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-page?canvas-width=800&canvas-height=800}

## Navigation and selection

- Elements are named according to their HTML tag or component name
- Toggle visibility of child elements using the triangle icon to collapse sections
- Select elements by clicking on them, just as in the canvas
- Drag elements to reorder them within the structure

::: info
HTML element names always correspond to their actual HTML element tag.
:::

::: tip
Hold the [kbd]Alt[kbd] key while dropping a dragged element to copy it instead of moving it.
:::

## Context menu

Right-clicking an element opens a context menu with several actions.

![An annotated image of a context menu that appears when you right-click an element. The annotations correspond to the list items below.|16/9](element-context-menu.webp 'Element context menu')

1. **Insert element**: Open the HTML element catalog to choose a new element to insert
2. **Wrap in element**: Place the currently selected HTML element inside a new parent element and open the HTML catalog
3. [Extract as component](/components/create-a-component#extract-existing-elements): Convert the HTML element into a reusable component
4. [Show/hide](/formulas/show-hide-formula): Set a formula to control whether an element or component is visible or not
5. [Repeat](/formulas/repeat-formula): Set a formula to create multiple instances of an element or component from an array
6. **Standard operations**: Duplicate, cut, copy, paste and delete

## Add a new element

Add a new element in one of three ways:

1. Click the [kbd]+ Element[kbd] button in the bottom bar
2. Use the keyboard shortcut [kbd]I[kbd] to open the element catalog
3. Select [kbd]Insert element[kbd] from the right-click context menu in the HTML element tree

## Element catalog

![The HTML element catalog is open, showing a searchable dialog, category filters on the right and the list of search results on the left.|16/9](element-catalog.webp 'Element catalog'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-page?rightpanel=style&canvas-width=800&canvas-height=800&selection=nodes.m6MApQ1ZZSiZ5iH6kAUWE&elementCatalog=true}

The element catalog contains all HTML elements, including existing components defined in your project. Use the element catalog to:

- Browse different HTML element types grouped by category
- Search for specific HTML elements by tag name and aliases (for example, you can search for `link` to find the HTML `a` tag)
- Search for project components by name
- View components from installed packages

Click an element to add it to your project. The element will be added as a child of the currently selected element or as the first child of the root element if no element is selected.

::: tip
If you need to change the tag name of an HTML element, edit its `Tag` in the `Attributes` panel on the right. This saves you having to delete and re-add elements.
:::
