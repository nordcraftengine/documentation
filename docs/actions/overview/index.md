---
title: Actions
description: Extend Nordcraft with custom JavaScript actions that provide global functionality, handle asynchronous operations, and integrate external libraries.
---

# Actions

Sometimes, you might need to do things in a browser that Nordcraft doesn’t natively support, such as accessing a user’s webcam or microphone, geolocation, or bluetooth functionalities. For all of these things, you can create custom actions using JavaScript code, that you can trigger via events. Actions are global and can be used anywhere in your project.

Using actions, you can:

- access browser APIs via JavaScript
- import and use external libraries
- perform asynchronous operations

::: tip
Most common tasks can be accomplished using Nordcraft's built-in formulas and workflows without writing code. Consider exploring these options before creating custom actions.
:::

## Difference to workflows and formulas

Understanding the differences between these three concepts helps you choose the right tool:

- **Actions**: JavaScript functions that can have side effects, are globally accessible, and can perform asynchronous operations
- **Workflows**: Visual sequences of operations scoped to components or pages, designed to respond to events and have side effects
- **Formulas**: Pure functions without side effects that transform data and return consistent results for the same inputs

::: dev
Actions in Nordcraft are essentially JavaScript functions, named to match the action name.
:::

## Key characteristics of actions

### Inputs

Actions accept inputs to the JavaScript function:

- Inputs are passed to the action when it is called from a workflow
- Each argument has a name and type
- Inputs provide flexibility to reuse the same action with different inputs

### Events

Actions can trigger events that call back to workflows:

- Events enable actions to communicate back to the component that called them
- An action can trigger multiple events at different times
- Events can pass data back to the workflow that will handle them

This creates a two-way communication channel between actions and workflows.

### Asynchronous execution

Actions can perform asynchronous operations:

- Use `async/await` or Promises for asynchronous code
- Trigger events after asynchronous operations complete
- Create timers, animation loops, or other time-based behaviors

### Cleanup

Actions can return a cleanup function that runs when a component unmounts:

- A cleanup function is a JavaScript function returned by your action
- This function is automatically called when the component that triggered the action is unmounted
- This is useful for clearing timers, removing event listeners, or disposing of resources
- Cleanup functions prevent memory leaks when components are removed from the page
