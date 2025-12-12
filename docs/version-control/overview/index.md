---
title: Version control
description: Manage and create branches, and manage changes in the current branch and syncronisation with the main branch.
---

# Version control

Version control lets you view and manage changes in your current branch. In case of conflicts between your current branch and the main branch, you can resolve them here.

![The editor with version control open, showing changes in the current branch and main.|16/9](version-control.webp 'Version control')

## Active branch
Switch branches from existing branches in the project, and view and manage changes on the current branch.

### Create and switch branches
Create a new branch by clicking the "+" button in the top right corner of the header. This will open a dialog to name and create the branch.
You can switch between existing branches using the input in the "Active" section.

### Manage changes in your current branch
The changes in your current branch are shown in the "Active" section.

![Changes are shown as items with an icon and a name, and letter to the right describing the type of change. The image is annotated corresponding to the section below.|16/9](version-control-changes.webp 'Version control changes')

All files that have changes in the current branch are listed in the "Active" section. Changes are calculated by comparing the current branch to the state of main at the point of branch creation. Since the main branch may also change through other branches being published, so the original main and current main may not be the same at the when the changes are calculated. The original state of main at the point of branch creation will be referred to as the "ancestor branch".

Each change is marked with an icon and name representing the change, as well as a letter decribing the type of change (#1 in the image):

- The letter C means that something is created. I does not exist in the ancestor branch
- The letter D means that something is deleted. It exists in the ancestor branch, but not in the current branch
- The letter E means that something is edited. It exists in both branches, but with different values.

If something is edited, you can dive deeper into the changes by expanding the item. That will reveal a list of all of the changes within that change (#2 in the image). As long as there are edited items in a list, it can be expanded to show those changes. Furthermore, whenever you select a created or edited change in the "Active" section, the actual value will be shown in the editor. Deleted changes cannot be shown in the current branch since they no longer exist, but may be explored on main via the context menu.

## Main branch
All files that have new changes in the main branch since the last synchronisation (or creation of the current branch), are shown in the "Main" section. Like in the current branch, the changes shown here are the difference between the current main branch and the ancestor branch. Edited changes can be expanded to show the changes within, and when you select a deleted or edited change the actual value is shown in the editor.

### View incoming changes in your main branch

## Conflict management

### Accepting changes

## Publishing
Add a description of the change on the current branch and publish it!

### Add a description

### Publish change