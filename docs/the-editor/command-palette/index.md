---
title: Command palette
description: Quickly search and open project files, create new pages or components, and execute actions using Nordcraft's command palette.
---

# Command palette

The command palette is the fastest way to navigate your project, jump between files, and perform actions directly from your keyboard without using the sidebar.

## Open the command palette

The command palette operates in two modes:

- **File search (Quick open)**: Press [kbd]Cmd/Ctrl[kbd] + [kbd]P[kbd] to search and open any file in your project.
- **Action search**: Press [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd] or [kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]P[kbd] to open the palette pre-filled with the action prefix (`>`) and execute editor actions.

You can also switch between file search and action search simply by typing or deleting the `>` character at the start of the input.

## File search

When opened with [kbd]Cmd/Ctrl[kbd] + [kbd]P[kbd], the command palette displays your recently opened files and lets you search across all project resources:

- **Components**: Reusable UI components
- **Pages**: Top-level application pages and routes
- **Formulas**: Project-wide custom formulas
- **Actions**: Global custom JavaScript action files
- **Services**: API integrations and external services
- **Routes**: Configured application routes and redirects

Start typing any part of a file name to fuzzy-filter the list. Use the [kbd]↑[kbd] and [kbd]↓[kbd] arrow keys to navigate the results and press [kbd]↵[kbd] to open the selected file into an editor tab.

## Action search

When opened with [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd] (or by typing `>` in the search input), the command palette lets you execute common editor commands:

### Creating new project files

You can create new files instantly without navigating through the project sidebar:

- **Create component**: Open the new component dialog
- **Create page**: Open the new page dialog
- **Create formula**: Create a new project formula
- **Create action**: Create a new custom JavaScript action
- **Create service**: Connect a new API or backend service
- **Add font**: Open the Google Font picker to install new fonts

### Managing the active file

When you have a file open in the editor, the command palette provides contextual actions for that file:

- **Rename**: Rename the current component, page, formula, action, or service
- **Duplicate**: Duplicate the current component, page, or route
- **Copy**: Copy the file definition to your clipboard as JSON
- **Delete**: Safely delete the open file (checks for component or service references before confirming)

## Keyboard navigation

- [kbd]↑[kbd] / [kbd]↓[kbd] - Move through search results
- [kbd]↵[kbd] - Open selected file or run selected action
- [kbd]Escape[kbd] - Close the command palette
