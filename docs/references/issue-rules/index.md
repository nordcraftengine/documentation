---
title: Issue rules
description: Improve the quality of your projects by detecting and fixing potential problems early with Nordcraft's issue rules.
---

# Issue rules

Nordcraft's issue rules help you maintain high-quality standards in your projects by highlighting common problems.

::: tip
To learn more about where issue rules are shown in the editor, check out the [issues panel](/the-editor/issues-panel).
:::

::: tip
To see how issue rules are implemented, visit the [Nordcraft GitHub repository](https://github.com/nordcraftengine/nordcraft/tree/main/packages/search/src/rules).
:::

## Actions

| Rule                                   | Severity |    Auto fixes     | Description                                                                                                                                                                                                             |
| -------------------------------------- | -------- | :---------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project actions with no references** | Warning  | Delete the action | Project actions that are not referenced anywhere in your project can lead to confusion and bloated projects. This rule flags unused project actions to help keep project clean and efficient.                           |
| **Unknown project action references**  | Warning  |        No         | Finds references to project actions that do not exist. This helps identify and correct broken references in projects.                                                                                                   |
| **No console**                         | Info     |        No         | Detects usage of the [Log to console](references/actions##log-to-console) action in workflows. While useful for debugging, leaving console logs in production code can lead to performance issues and cluttered output. |

## Formulas

| Rule                                    | Severity |     Auto fixes     | Description                                                                                                                                                                                            |
| --------------------------------------- | -------- | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Project formulas with no references** | Warning  | Delete the formula | Project formulas that are not referenced anywhere in your project can lead to confusion and bloated projects. Nordcraft flags these unused formulas to help you keep your project clean and efficient. |
| **Unknown project formula references**  | Error    |         No         | Finds references to project formulas that do not exist. This helps you identify and correct broken references in your project.                                                                         |
