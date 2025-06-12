---
title: Manage packages
description: Learn how to install, update, and remove packages from your Nordcraft project using the built-in package manager.
---

# Manage packages

Once you have found packages that you would like to use in your Nordcraft package, learn how to you can install, update, and manage them.

## Install a package

![Install a package|16/9](install-a-package.webp)

Add a package to your project by:

1. Clicking the install button next to a package in the left panel or
2. Using the install button in the top-right corner of the package details page

Once a package is installed, its components, actions, and formulas become available throughout your project:

- **Components** appear in the element catalog under `Components`
- **Actions** become available in workflows and events
- **Formulas** can be used anywhere formulas are supported

## Manage installed packages

The `Installed` tab in the packages panel shows all packages currently used in your project.

![Installed packages|16/9](update-a-package.webp)

### Update a package

When an installed package has updates available, a green update icon appears next to it. Click this icon to install the latest version.

::: tip
Always create a new branch before updating packages. This allows you to test your application with the updated package and resolve any issues before publishing.
:::

### Uninstall a package

Uninstall a package by clicking the trash icon next to it in the packages list or on the package details page.

::: info
Removing a package will remove access to its components, actions and formulas. Any instances already used in your project will need to be replaced.
:::
