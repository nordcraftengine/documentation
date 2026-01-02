---
title: Version control
description: Manage and create branches, and manage changes in your active branch and synchronize your active changes with the main branch.
---

# Version control

Version control lets you view and manage changes in your active branch. In case of any conflicts between your active branch and the main branch, you can resolve them here.

![The editor with version control open, showing changes in your active branch and main.|16/9](version-control.webp 'Version control')

## Active branch

Switch branches from existing branches in the project, and view and manage changes in your active branch.

### Create and switch branches

Create a new branch by clicking the [kbd]+[kbd] button in the top right corner of the header. This will open a dialog to name and create the branch.
You can switch between existing branches using the input in the `Active` section.

### View changes in your active branch

The changes in your active branch are shown in the `Active` section.

![Changes are shown as items with an icon and a name, and letter to the right describing the type of change. The image is annotated corresponding to the sections below.|16/9](version-control-changes.webp 'Version control changes')

All files that have been modified in your active branch are listed in the `Active` section. Changes are calculated by comparing your active branch to the state of the main branch at the point of branch creation. Since the main branch may also change when other branches are published, the original main and current main may not be the same at the when the changes are calculated. The original state of main at the point of branch creation will be referred to as the `ancestor branch`.

Each change is marked with an icon and name representing the change, as well as a letter describing the type of change (#1 in the image):

- `C`: something has been created. The page, element, component, formula, or workflow etc. does not exist in the ancestor branch.
- `D`: something has been deleted. It exists in the ancestor branch, but not in the current branch.
- `E`: something has been edited. It exists in both branches, but in different states.

If something has been edited, you can dive deeper into the changes by expanding the item. This will reveal a list of all of the changes made to that item (#2 in the image). As long as there are edited items in a list, it can be expanded to show those changes. Additionally, whenever you click to select a created or edited change in the `Active` section, the value will be shown in the editor (#3 in the image). For example, if you made changes to a formula, clicking on the affected item will open the formula editor.
Deleted changes cannot be shown in the current branch since they no longer exist, but may be explored on the main branch via the context menu.

## Main branch

All files that have been changed in the main branch since the last synchronization (or creation of your active branch), are shown in the `Main` section. Like in your active branch, the changes shown here are the difference between your active main branch and the ancestor branch. Edited changes can be expanded to show the changes within, and when you select a deleted or edited change the actual value is shown in the editor.

When there are changes in the `Main` section, it means that your active branch is `Out of sync`. In order to be able to publish the changes on your active branch it will be necessary to synchronise the changes on with the changes on your active main. If there are no changes overlapping changes between the two branches, synchronising will be as simple as clicking the `Sync with main` button. That will merge the changes on main into the changes on your active branch and enable publishing.

## Conflict management

Overlapping changes between your active branch and main are called conflicts. Overlapping changes cannot be synchronised automatically, since there are two possible outcomes in that conflict. In order to resolve a conflict, you will need to accept one of the two changes. Conflicting changes on your active branch can be accepted by right clicking an item in the `Active` section and selecting `Accept current`. Conflicting changes on main can be accepted by right clicking an item in the `Main section and selecting `Accept incoming`.

### Publish changes

As long as your active branch is synchronized with the main branch, you can publish the active branch changes. When you publish changes, your changes will be merged into the main branch and become visible to users immediately on the live site. You can explore the commits to the main branch along with their descriptions, on the project page.
