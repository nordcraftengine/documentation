---
title: Managing changes
description: Manage and create branches, manage changes in your active branch, and synchronize your active changes with the main branch.
---

# Managing changes

In Nordcraft, you can view, inspect, and publish changes in your active branch using **Ship mode**. In case of conflicts between your active branch and the main branch, you can resolve them before publishing.

## Accessing Ship mode

You can enter Ship mode at any time using:

- The keyboard shortcut [kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]S[kbd]
- The **Ship** button on the [bottom bar mode switcher](/the-editor/bottom-bar)

## Ship mode workspace

When you switch to Ship mode, the editor adapts into a dedicated diff and release workspace:

![The Ship mode changes view, displaying the list of modified files on the branch, conflict status, and the publishing dock.|16/9](version-control-changes.webp 'Ship mode changes'){https://editor.nordcraft.com/projects/docs_examples/branches/main/ship/changes}

1. **Changes sidebar**: Displays all files modified on your branch as well as recent updates to the `main` branch.
2. **Diff and inspection view**: Selecting any modified file in the sidebar opens a structured side-by-side comparison of its nodes, styles, attributes, and formulas.
3. **Bottom bar publishing dock**: Provides a summary of changed files, a commit message input field, and action buttons for syncing and publishing.

## Active branch changes

All files that have been modified in your active branch are listed in the branch changes list. Changes are calculated by comparing your active branch to the state of the main branch at the point of branch creation (the `ancestor branch`).

Each change is marked with an icon and name representing the change, as well as a label describing the change type:

- `C`: A file or value created on your branch that does not exist in the ancestor branch.
- `D`: A file or value deleted from your branch that exists in the ancestor branch.

Clicking on any file or change displays the exact difference in the central diff viewer.

## Main branch updates and syncing

All files changed in the `main` branch since your active branch was created (or last synchronized) appear in the `Main` changes section.

When changes are present on `main`, your branch is **Out of sync**:

- If there are no overlapping edits to the same properties or nodes, click the **Sync with main** button on the bottom bar to automatically pull and merge main's changes into your branch.
- Once synchronized, the Publish button becomes active.

## Conflict management

Overlapping changes between your active branch and main are called conflicts. When conflicts exist:

- The bottom bar displays an alert with the number of conflicting files.
- Each conflicting item can be inspected in the diff viewer.
- Choose which change to keep:
  - **Accept active changes**: Keep the version from your current branch to override main.
  - **Accept incoming changes**: Accept the change from main to override your branch.
  - **Reset changes**: Revert your branch's changes back to the ancestor state.

Once all conflicts are decided and resolved, click **Sync with main** to complete the merge.

## Publishing changes

To ship your changes to production:

1. Ensure your branch is synchronized with `main` and all conflicts are resolved.
2. In the bottom bar dock's commit description field (_"What did you change?"_), enter a clear description of your update.
3. Click the **Publish** button or press [kbd]Cmd/Ctrl[kbd] + [kbd]↵[kbd].

Your changes will be merged into the `main` branch and deployed to your live website immediately.
