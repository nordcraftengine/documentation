---
title: Workflows overview
description: Learn about workflows in Nordcraft as event-driven sequences that execute operations with side effects in your application.
---

# Workflows overview

A workflow in Nordcraft is a series of actions that are executed on certain events. It can contain complex logic and trigger behaviors.

::: dev
The way workflows work in Nordcraft is very similar to functions in JavaScript.
:::

## When to use workflows

Use workflows to react to events. For example, when a user clicks on a button, you can respond to a click event and make something happen. "Make something happen" is the workflow. You can create all kinds of logic to respond to the click event. Typical examples include:

- setting or updating variables
- triggering events
- calling APIs

Check out [working with workflows](/workflows/working-with-workflows) to learn how to create workflows and add logic.

## Difference between formulas and actions

[Formulas](/formulas/overview) in Nordcraft are pure functions. This means that they do not have side effects. Workflows, on the other hand, are designed to have side effects. They work in a "when this happens, do that" manner.

[Actions](/actions/overview) and workflows are similar, but have a few key differences:

- **Workflows** are scoped, meaning they belong to a page or a component. Workflows can only be executed in their scope or via a [context](/contexts/overview). Workflow logic is created in Nordcraft's visual environment.
- **Actions** are global to the project. Actions can be called from anywhere in your project. Actions are written in JavaScript and are used to extend Nordcraft's functionality.
