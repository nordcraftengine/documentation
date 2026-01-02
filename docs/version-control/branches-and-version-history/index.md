---
title: Branches and version history
description: Learn how to use branches in Nordcraft to develop features safely.
---

# Branches and publishing in Nordcraft

Branches in Nordcraft allow you to develop new features or fix issues without affecting the live version of your project. They provide a safe environment to make and test changes before making them available to users.

## Understanding branches

When you create a new project, Nordcraft automatically creates a branch called `start` for you. The `main` branch represents what your users see in production. You cannot edit the main branch directly, but you can view it in the editor.

Branches work like branches on a tree:

- Your `main` branch is the trunk that users see
- New branches grow from this trunk
- When a branch is complete, it can be merged back into the trunk
- When a branch is merged, it becomes becomes part of the trunk

If you are familiar with [Git version control](https://git-scm.com/), Nordcraft branches work in the same way.

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

![The project page has information about branches and version history.|16/9](version-control-project-page-large.webp 'Project page')

On the [project details](/get-started/project-details) page you can view a list of current active branches. You can choose to edit, preview or delete branches from the list. You can also see the version history of the project, containing all commits to the main branch along with their descriptions.

### Create a new branch

1. Click the [kbd]Create branch[kbd] button
2. Choose a descriptive name for the branch and confirm

When the branch is created, you are automatically taken to the editor to start working on that new branch.

You can have multiple active branches at the same time, each focusing on a different feature or fix.

### Edit a branch

You can edit all branches in your project except for the main branch. When you click the [kbd]Edit[kbd] button, the editor will open the selected branch and you can start working.

### Preview a branch

You can preview your branch to test changes before publishing.

- Select `Preview` in the branch menu
- This opens a preview at `branch-project.nordcraft.site`
- You can share this preview link with others for feedback
- All changes made on a branch are automatically synced to the preview link

### Delete branch

You can delete your branch by selecting `Delete` in the branch menu. This will remove the branch along with all of the changes made on it.

::: warning
Deleting a branch cannot be undone, so make sure that you do not need the branch anymore.
:::

## Version history

The version history of your project is shown as a list of commits to main. Every time you publish a branch, an entry will be made in this list. Each entry show when the given changes was made, who made it, as well as the description for that change. Since the branches are deleted when published, it is not possible to explore the change, so be sure that you give a good description when publishing a branch.

## Roll back changes

If you discover issues on your live project after publishing, you may need to revert to a previous version of your project. This is known as a rollback.

1. Go to the [version history](/get-started/project-details#version-history) section in [project details](/get-started/project-details)
2. Find the version you know worked correctly
3. Select the `Rollback` option in the manu next to that version
4. Confirm the rollback

This will restore your live application to the selected version state immediately, overwriting the current version.

::: warning
Rolling back is a significant action that affects your live application. Make sure you have selected the correct version before confirming.
:::

::: tip
To save the current changes, create a new branch before rolling back. That way you will not lose the changes you did after the commit you rolled back.
:::