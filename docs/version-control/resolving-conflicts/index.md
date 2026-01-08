---
title: Resolving conflicts
description: Learn how to manage and resolve merge conflicts, reset files or roll back changes.
---

# Resolving conflicts

If your current branch is out of sync with the main branch, you will need to merge the changes from main into the current branch (sync). If there are no conflicts in the files between the two branches, you can click the `Sync with main` button . If there are conflicts, you can either choose to accept the change in your active branch or the change on main. Alternatively, you can reset all changes in the file before syncing.

## Sync with main

Before publishing, your branch must be up to date with the latest changes in the main branch. If someone else has published changes since you created your branch, it will no longer be up to date, and you will need to sync with the main branch:

1. Click the [kbd]Sync with main[kbd] button to pull the newest version of the main branch into your working branch
2. Once synchronized, you can publish your changes

## Managing conflicts with main

Conflicts can occur when two branches have made changes to the same section of code. When this happens:

1. Nordcraft will identify and highlight the conflicting changes
2. You will need to decide which changes to keep:
   - Accept the changes from your active branch to override the changes in main
   - Accept the changes from your main branch to override the changes in your active branch
   - Reset the changes in your active branch to remove the conflict
3. For each conflict, select the desired option

After resolving all conflicts, you can complete the [sync with main](#sync-with-main).

### Accepting active changes

To accept a change from your active branch, right click the conflicting change and select the `Accept active changes` option. This will mark the change so that the changes on your active branch will be used when synchronizing. That means that instead of the changes incoming from the main branch, you will get the changes from your active branch.

::: warning
Accepting a change in a file will only affect that file, so be sure to check for missing references or contexts after synchronizing.
:::

### Accepting main changes

To accept a change from your main branch, right click the conflicting change and select the `Accept main changes` option. This will mark the change so that the incoming changes on your main branch will be used when synchronizing. That means that any changes you have made on the active branch will be overridden. If you're unsure of any side effects that may happen as a result of conflicts, you can make a copy of the changes before synchronizing.

### Reset active changes

To resolve a conflict you can reset the changes on your active branch by right clicking a change and selecting `Reset changes`. When you reset a change, the state of that change will be reset to the state of the ancestor branch, which is the state of main at the time when the active branch was created. Resetting a change before synchronizing can be compared to accepting the main change. When you reset and synchronize, you will end up getting the change from the main branch. The difference is that you can always choose to reset a change, regardless of whether or not it is in conflict.
