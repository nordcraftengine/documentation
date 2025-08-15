---
title: Working with actions
description: Define custom JavaScript actions with arguments, events and cleanup functions to add specialized capabilities to your Nordcraft workflows.
---

# Working with actions

Learn how to define custom JavaScript actions with arguments, events, and cleanup functions to add specialized capabilities to your Nordcraft workflows.

## Create an action

![The project sidebar is visible on the left of the editor, showing an action named confetti in the actions list. To the right, the confetti action is visible, showing a number of input arguments, a single defined event name, and the custom code further to the right in an IDE-like text editor. The image is annotated according to the list items below.|16/9](create-an-action.webp 'Create an action'){https://editor.nordcraft.com/projects/docs_examples/branches/main/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800}

To create an action:

1. Open the [project sidebar](/the-editor/project-sidebar) by clicking the folder icon or using [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd]
2. Locate the **Actions** section, click the [kbd]+[kbd] button and enter a name
3. Add a short description for your action
4. Write your JavaScript code in the code editor

::: info
An action must contain a function with the same name as the action itself. This is the entry point.
:::

Custom actions have a specific structure with an entry function that receives two parameters:

- `args`: contains all arguments passed to the action
- `ctx`: provides access to Nordcraft-specific functionality

The function can return a cleanup function that will be called when the component unmounts.

## Configure arguments

![The confettig action is now being edited in a full screen view. To the right, a number of input arguments have been defined, a single event is defined, and the custom code is visible to the right in an IDE-like text editor. The image is annotated according to the list items below.|16/9](configure-arguments.webp 'Configure arguments'){https://editor.nordcraft.com/projects/docs_examples/branches/main/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800}

To add arguments to your action:

1. Click the [kbd]+[kbd] button in the **Arguments** section
2. Enter a name for the argument
3. Select the argument type from the dropdown (`String`, `Number`, etc.)

In your code, access these arguments through the `args` parameter, using the names you defined. If you have an argument named `value`, access it in the code editor using `args.value`.

## Set up events

![The confetti custom action is visible in the editor. The image is annotated according to the list items below, highlighting how to create events with the associated plus button, naming the event, and where to provide example output for this event.|16/9](set-up-events.webp 'Set up events'){https://editor.nordcraft.com/projects/docs_examples/branches/main/actions/confetti?rightpanel=style&canvas-width=800&canvas-height=800}

To create events that your action can trigger:

1. Click the [kbd]+[kbd] button in the **Events** section
2. Enter a name for the event
3. Optionally provide example output to define the data structure

In your code, you can trigger events using the context object's `triggerActionEvent` method with the event name and data. When using the action in a workflow, you can then handle these events by adding actions to them.

For example, to trigger an event named `update_user` in your action, use `triggerActionEvent("update_user", data)` where data is an object that has been passed as an argument into the action, which you can modify in the action if necessary.

## Action capabilities

When developing actions, keep these important considerations in mind:

- **Client-side only**: Actions run in the browser only (client-side), not during server-side rendering
- **DOM access**: Use `ctx.root` instead of `document` for DOM operations to ensure compatibility with Shadow DOM when components are exported as web components
- **Asynchronous code**: Actions can be [asynchronous](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) using the `async/await` syntax or [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- **Cleanup**: Return a function from your action to automatically clean up resources when the component that triggered the action is unmounted (e.g. [remove event listener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener))
- **Error handling**: Actions should handle errors gracefully to avoid breaking your application

::: warning
When you set up ongoing processes like intervals or event listeners in your actions, always return a cleanup function to avoid memory leaks.
:::

## Use an action

Custom actions can be used just like built-in workflow actions. When [creating a workflow](/workflows/working-with-workflows), you can add your custom actions as nodes by selecting them from the **Project Actions** section. You can provide values for any arguments defined in the action and handle any events it might trigger.

Here is an example of a custom action in Norcraft. It demonstrates how the [canvas-confetti](https://github.com/catdad/canvas-confetti) library can be integrated to create a celebratory effect when triggered.

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-action.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-action?canvas-width=800&rightpanel=events&selection=nodes.RVOI8hoh4CAD8XqcLfA4o.events.onClick&canvas-height=800
height: 4rem

This button triggers a confetti animation using a custom action. The action imports the [canvas-confetti](https://github.com/catdad/canvas-confetti) library and executes it when triggered. [kbd]Shoot Confetti[kbd] to see the action in effect.
@@@

::: danger
Be cautious when pasting code snippets from external sources into custom actions. Custom code can execute any JavaScript you add, which may introduce security vulnerabilities if you do not trust the source.
:::
