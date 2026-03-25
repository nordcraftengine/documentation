---
title: Variables overview
description: Learn how to implement state management in Nordcraft with variables to store temporary data within components and pages.
---

# Variables

There may be times when you need to keep track of changing information on a web page, and update the page when that information changes, or store temporary data within components and pages. This is known as managing state. In Nordcraft, you use variables to manage state.

Variables in Nordcraft are containers for temporary data that:

- Store values that can change during user interaction
- Persist only while the component or page is mounted
- Reset to their initial values when the page reloads
- Are scoped to the component or page where they're defined

## Using variables

Variables can be used throughout a component or page:

- **In formulas**: Reference variables directly by name
- **In workflows**: Use variables in conditions and actions
- **In elements**: Bind element properties to variables
- **In styling**: Create dynamic styles based on variable values

This makes variables ideal for managing temporary states like:

- UI state (expanded/collapsed menus, selected tabs)
- Form input values
- Temporary calculation results
- User preferences for the current session

## Variable scope

Variables in Nordcraft are scoped to the pages and components on which they are defined, meaning parent and child components cannot access each other's variables. This prevents unexpected side effects, makes component behaviour more predicatable, and means it doesn't matter if you reuse variable names across different page and components.
