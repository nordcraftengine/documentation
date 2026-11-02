---
title: Bottom bar
description: Use Nordcraft's bottom bar to switch between Play, Design, and Ship modes, access context-sensitive canvas tools, and publish changes.
---

# Bottom bar

The bottom bar is the primary control center in the Nordcraft editor. It houses the mode switcher (Play, Design, and Ship) and displays context-sensitive toolbars for each mode.

![The Nordcraft bottom bar showing the mode switcher and toolbars.|16/9](bottom-bar.webp 'Bottom bar')

## Mode switcher

On the right side of the bottom bar is the mode switcher, allowing you to transition between the three core phases of building in Nordcraft:

1. **Play mode** ([kbd]Cmd/Ctrl[kbd] + [kbd]I[kbd]): Explore, prompt, and iterate with the AI assistant.
2. **Design mode** ([kbd]Cmd/Ctrl[kbd] + [kbd]D[kbd]): Fine-tune layouts, styles, HTML attributes, and workflows.
3. **Ship mode** ([kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]S[kbd]): Review file diffs, resolve conflicts, and publish changes to the live site.

## Play mode tools

When in Play mode, the bottom bar provides tools designed for conversational and visual AI prompting:

- **Select tool** ([kbd]V[kbd]): Select elements on the canvas.
- **Interact tool** ([kbd]C[kbd]): Click buttons, fill forms, and test interactions directly on the canvas without leaving Play mode.
- **Pan tool** (Hold [kbd]Space[kbd] or click the hand icon): Move around the canvas workspace.
- **AI Reference tool** ([kbd]I[kbd]): Click any element on the canvas to reference it in your AI prompt, allowing the AI to know exactly which element you want to modify.
- **Annotation tool** ([kbd]T[kbd]): Open the annotation toolbar to draw on the canvas using freehand pens ([kbd]P[kbd]), rectangles ([kbd]R[kbd]), ellipses ([kbd]O[kbd]), lines ([kbd]L[kbd]), and text notes ([kbd]T[kbd]). The AI analyzes these visual annotations alongside your written prompt.

## Design mode tools

When in Design mode, the bottom bar switches to direct manipulation and layout creation tools:

- **Select tool** ([kbd]V[kbd]): Select elements to inspect their properties in the element tree and right-hand panels.
- **Interact tool** ([kbd]C[kbd]): Temporarily interact with elements without leaving Design mode.
- **Pan tool** (Hold [kbd]Space[kbd] or click the hand icon): Pan across the canvas.
- **Transform tool** ([kbd]W[kbd]): Activates the visual transform toolbar to resize, reposition, and transform the selected element.
- **Frame tool** ([kbd]F[kbd]): Draw container `div` frames directly onto the canvas.
- **Text tool** ([kbd]T[kbd]): Click on the canvas to place and edit text elements directly.
- **Insert element** ([kbd]I[kbd]): Open the [element catalog](/the-editor/element-tree#element-catalog) to insert HTML elements and reusable components.

## Ship mode dock

When switching to Ship mode, the bottom bar expands into a publishing dock:

- **Changes count**: Displays the total count of files modified on the active branch.
- **Commit description**: A multiline text field where you enter a summary of your changes (_"What did you change?"_). Press [kbd]Cmd/Ctrl[kbd] + [kbd]↵[kbd] to publish immediately.
- **Publish button**: Merges your changes into the `main` branch and publishes them to your production site.
- **Sync with main**: When another collaborator has published changes to `main`, this button appears to pull and merge the latest changes into your working branch.
- **Conflict indicator**: Displays the number of conflicting files when incoming changes overlap with your branch. Conflicts must be resolved in Ship mode before syncing and publishing.
- **Publish on Discord**: An optional toggle for projects integrated with Discord notification webhooks.

::: tip
You can also toggle full screen Test mode at any time with [kbd]Option/Alt[kbd] + [kbd]T[kbd] to preview your application without any editor chrome.
:::
