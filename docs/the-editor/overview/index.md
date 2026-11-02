---
title: The Nordcraft editor
description: Understand the four main sections of Nordcraft's editor interface - the canvas, bottom bar, left panel and right panel.
---

# The Nordcraft editor

The Nordcraft editor is your workspace for building websites and packages. It provides an AI-native, visual, and code-grade environment designed around three distinct modes: **Play**, **Design**, and **Ship**.

![The Nordcraft editor, showing a full HTML element tree of HTML elements and components, and a card component on the canvas. The image is annotated with numbers that relate to the lists items below.|16/9](editor-overview.webp 'Editor overview'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-page?canvas-width=800&canvas-height=800&rightpanel=events}

## The three editor modes

In Nordcraft 3.0, the editor is built around three core modes available in the [bottom bar](/the-editor/bottom-bar):

1. **Play mode** ([kbd]Cmd/Ctrl[kbd] + [kbd]I[kbd]): Explore, interact with your site, and build features through conversational and visual AI prompts. Play mode is the default mode when opening projects.
2. **Design mode** ([kbd]Cmd/Ctrl[kbd] + [kbd]D[kbd]): Visually design and manipulate elements, configure styles, set up HTML attributes, and build component logic.
3. **Ship mode** ([kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]S[kbd]): Inspect file diffs, resolve merge conflicts, and publish changes to your production website.

## Workspace layout

The editor workspace consists of four main areas:

1. [Canvas](/the-editor/canvas): The central visual workspace where your pages and components render in real time.
2. [Bottom bar](/the-editor/bottom-bar): The command dock featuring the mode switcher (Play, Design, Ship) and mode-specific tools (such as AI annotation, transform, frames, and publishing controls).
3. **Left panel**: Context-sensitive panel that displays:
   - [Element tree](/the-editor/element-tree): The HTML hierarchy of your page or component
   - [Project sidebar](/the-editor/project-sidebar): Project files, services, project formulas, actions, media, and settings
   - [Packages](/the-editor/packages): Browse, install, and manage external packages
   - [Issues panel](/the-editor/issues-panel): Find and resolve project warnings or errors
4. **Right panel**: Context-sensitive inspector that displays:
   - [Data panel](/the-editor/data-panel): Variables, formulas, APIs, and workflows
   - [Element panel](/the-editor/element-panel): CSS styles, attributes, and event handlers for selected elements
   - [AI Assistant](/ai-assistant): AI chat panel with prompt history and generation controls

## Left panel

Click the Nordcraft logo in the top left corner to navigate back to project details, organization members, projects or the dashboard.

The HTML [element tree](/the-editor/element-tree) appears by default in the left panel. Use the icon buttons on the left sidebar to switch between:

- [Project sidebar](/the-editor/project-sidebar)
- [Packages](/the-editor/packages)
- [Issues panel](/the-editor/issues-panel)

Click on the background of the editor or press [kbd]Escape[kbd] to return to the element tree view from any other panel.

## Right panel

The right panel displays different content based on your selection:

- [Data panel](/the-editor/data-panel): Displayed by default when no element is selected
- [Element panel](/the-editor/element-panel): Appears when an element or component is selected, with tabs for styling, attributes and events

The AI assistant opens in a separate right panel, so you can continue to work whilst interacting with the AI assistant.

## Command palette

Press [kbd]Cmd/Ctrl[kbd] + [kbd]P[kbd] or [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd] to open the [command palette](/the-editor/command-palette) from anywhere in the editor. It allows you to quickly search and jump to any project file, create new components or pages, and execute editor commands without using the mouse.

::: tip
For a guided tour of the Nordcraft editor, check out the following lesson from the [Nordcraft Fundamentals](https://nordcraft.com/learn/fundamentals) video course.
:::

@@@ youtube
videoId: rMnUFOF1wJ0
title: Get to know the Nordcraft editor
@@@
