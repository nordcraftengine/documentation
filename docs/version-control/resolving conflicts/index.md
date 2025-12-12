---
title: Resolving conflicts
description: Learn how to manage and resolve merge conflicts, reset files or roll back changes.
---

# Resolving conflicts

If your current branch is out of sync with the main branch, you will need to merge the changes from main into the current branch (sync). This is as simple as clicking the "Sync with main" button if there are no conflicts in the files between the two branches. If there are conflicts, you can either choose to accept the change on the current branch or the change on main. Or you can reset the file entirely before syncing.

## Sync with main

![The view changes screen, showing that the current branch is out of sync with main. A list of changes that happened on main is followed by a large sync with main button. Below are the changes made on the current branch. At the top right there are two buttons allowing you to edit the current branch or delete it.|16/9](sync-with-main.webp 'Sync with main')

Before publishing, your branch must be up to date with the latest changes in the main branch. If someone else has published changes since you created your branch, it will no longer be up-to-date, and you will need to sync with the main branch:

1. Click the [kbd]Sync with main[kbd] button to pull the newest version of the main branch into your working branch
2. Once synchronized, you can [publish your changes](#publish-changes)


## Managing conflicts with main

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

## Roll back changes

If you discover issues on your live project after publishing, you may need to revert to a previous version of your project. This is known as a rollback.

1. Go to the [version history](/get-started/project-details#version-history) section in [project details](/get-started/project-details)
2. Find the version you know worked correctly
3. Click the [kbd]Rollback[kbd] button next to that version
4. Confirm the rollback

This will restore your live application to the selected version state immediately, overwriting the current version.

::: warning
Rolling back is a significant action that affects your live application. Make sure you have selected the correct version before confirming.
:::
