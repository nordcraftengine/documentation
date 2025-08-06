---
title: Branches and publishing in Nordcraft
description: Learn how to use branches in Nordcraft to develop features safely, test changes, resolve merge conflicts, and publish updates to live applications.
---

# Branches and publishing in Nordcraft

Branches in Nordcraft allow you to develop new features or fix issues without affecting the live version of your project. They provide a safe environment to make and test changes before making them available to users.

## Understanding branches

When you create a new project, Nordcraft automatically creates a branch called `start` for you. The `main` branch represents what your users see. You cannot edit the main branch directly, but you can view it in the editor.

Branches work like branches on a tree:

- Your `main` branch is the trunk that users see
- New branches grow from this trunk
- When a branch is complete, it can be merged back into the trunk
- When a branch is merged, it becomes becomes part of the trunk

If you're familiar with git version control, Nordcraft branches work in the same way.

## Advantages of branches

Using separate branches for individual features or fixes provides several benefits:

- **Isolated development**: Work on specific features without impacting other work in progress
- **Easier collaboration**: Reduce coordination overhead when multiple people work on the same project in parallel
- **Stability of live version**: The main branch remains stable with completed and tested features only
- **Simplified testing**: Test changes independently before publishing
- **Reduced risk of conflicts**: Minimize conflicts from simultaneous edits to the same project

::: tip
Keep branches small and short-lived. A branch should contain just a single feature like `add-color-picker` or `fix-dialog-styling-issue`.
:::

## Working with branches

### Create a new branch

![After pressing the create branch button, a dialog opens which is annotated. Here you can name your branch and either cancel or create the new the branch.|16/9](create-new-branch.webp 'Create new branch')

1. On the [project details](/get-started/project-details) page, click the [kbd]Create branch[kbd] button
2. Choose a descriptive name for the branch and confirm

When the branch is created, you are automatically taken to the editor to start working on that new branch.

You can have multiple active branches at the same time, each focusing on a different feature or fix.

### Preview a branch

You can preview your branch to test changes before publishing.

- Select your branch and click the [kbd]Preview[kbd] option
- This opens a preview at `branch-project.nordcraft.site`
- You can share this preview link with others for feedback
- All changes made on a branch are automatically synced to the preview link

### View changes

When working in a branch, you can view all modifications made and compare them to the state of the main branch.

- Click the [kbd]View changes[kbd] button in the [bottom bar](/the-editor/bottom-bar) of the editor or in [project details](/get-started/project-details)
- Review all modifications made in your current branch
- Identify any conflicts that need resolving before publishing

![The view changes screen, showing a textarea to add an update or commit message, a publish button that is currently disabled, and a list of changes made to the project below.|16/9](view-changes.webp 'View changes')

1. Enter a description for your changes
2. Publish your branch
3. Navigate back to project details
4. Navigate back to this branch's editor
5. Delete your branch
6. Reset all changes for the selected page or component
7. Edit the selected page or component directly

### Publish changes

When you're ready to make your changes live:

1. Enter a short description to your update (make your description _descriptive_, this will help you later in case you need to roll back)
2. Click the [kbd]Publish branch[kbd] button

Your changes will be merged into the main branch and become visible to users immediately.

### Sync with main

![The view changes screen, showing that the current branch is out of sync with main. A list of changes that happened on main is followed by a large sync with main button. Below are the changes made on the current branch. At the top right there are two buttons allowing you to edit the current branch or delete it.|16/9](sync-with-main.webp 'Sync with main')

Before publishing, your branch must be up to date with the latest changes in the main branch. If someone else has published changes since you created your branch, it will no longer be up-to-date, and you will need to sync with the main branch:

1. Click the [kbd]Sync with main[kbd] button to pull the newest version of the main branch into your working branch
2. Once synchronized, you can [publish your changes](#publish-changes)

### Resolve merge conflicts

![The view changes screen shows a red conflicts with main warning. You have the option to reset the conflicting file on the main branch or the current branch. Additionally you can edit or delete the branch using the buttons at the top right.|16/9](merge-conflicts.webp 'Merge conflict')

Merge conflicts can occur when two branches have made changes to the same section of code. When this happens:

1. Nordcraft will identify and highlight the conflicting changes
2. You will need to decide which changes to keep:
   - Reset your branch's changes to use the main branch version
   - Reset main's changes to keep your branch's version
3. For each conflict, select the appropriate reset option

After resolving all conflicts, you can complete the [sync with main](#sync-with-main).

::: warning
When you reset a change, that version will be discarded. Make sure you understand what each change contains before deciding which changes to keep.
:::

::: tip
If you have changes you need to preserve when resolving conflicts, consider copying those changes to a new branch (which will automatically be in sync with `main`).
:::

### Roll back changes

If you discover issues on your live project after publishing, you may need to revert to a previous version of your project. This is known as a rollback.

1. Go to the [version history](/get-started/project-details#version-history) section in [project details](/get-started/project-details)
2. Find the version you know worked correctly
3. Click the [kbd]Rollback[kbd] button next to that version
4. Confirm the rollback

This will restore your live application to the selected version state immediately, overwriting the current version.

::: warning
Rolling back is a significant action that affects your live application. Make sure you have selected the correct version before confirming.
:::
