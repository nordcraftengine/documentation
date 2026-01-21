---
title: Working with workflows
description: Create event-triggered and reusable workflows with parameters and sequential action nodes to implement interaction logic in your Nordcraft app.
---

# Working with workflows

Learn how to create event-triggered and reusable workflows with parameters and sequential action nodes to implement interaction logic in your Nordcraft app.

## Create a workflow

You can create a workflow on any event in Nordcraft. This can be a standard JavaScript event on an element, a custom [event on a component](/components/interface-and-lifecycle#setting-up-events) or lifecycle events like `On load` or `On attribute change`.

![The events panel is visible on the right of the editor. An onClick event has been created, and its dialog window is open. The onClick event sets the wasClicked variable to true, and then runs a workflow named increaseCounter. The workflow is identified by an icon representing three square orange nodes connected together with branches.|16/9](create-workflow-on-event.webp 'Create a workflow'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-workflows?canvas-height=800&canvas-width=800&selection=nodes.root.events.onClick&rightpanel=events}

To create a workflow on an event:

1. Select the event; this can be any event in Nordcraft
2. Add [nodes](#nodes) to create your logic

## Reusable workflows

If you have logic in your component that you need multiple times or if the logic tree is complex, you can create a reusable workflow from the [data panel](/the-editor/data-panel#workflows).

![The attributes panel is visible to the right of the editor. In the workflow list, there is one workflow named increaseCounter. This workflow is selected and the associated dialog is open. This dialog allows renaming, and shows that when the workflow is triggered, the variable clickCount is set via a formula, given the blue fx button next to the value of set clickCount is highlighted in blue.|16/9](create-reusable-workflow.webp 'Create reusable workflow'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-workflows?canvas-width=800&canvas-height=800&selection=workflows.Zpfk7v&rightpanel=events}

To create a reusable workflow:

1. With no element selected so that you can see the data panel, click the [kbd]+[kbd] button in the workflows section
2. Select a name for the workflow and optionally add [parameters](#parameters-and-events) and/or [callback events](#parameters-and-events)
3. Add [nodes](#nodes) to create your workflow logic

::: tip
Create reusable workflows to keep your logic trees manageable or if you need to use the same functionality multiple times.
:::

## Parameters and events

When a workflow is triggered by an event, you have access to the event's data within the formulas of the workflow, enabling you to react to the data of the event.

![The formula editor has been opened from the set action in an onClick event. In the formula editor, event data from the click event is available to be selected, such as x and y coordinates, and whether the alt key was held down. The event list is scrollable, so there are many more data points available for this event.|16/9](workflow-event-data.webp 'Use event data')

In reusable workflows, you can define parameters. These are the inputs of the workflow and you can use them in any formula in the workflow. By defining parameters, you can create workflows that can cover multiple scenarios.

![The attributes panel is visible and a workflow named increaseCounter is selected from the workflow list. The dialog for the workflow is open. One parameter has been defined, with the name count and a test value of 1. The image is annotated according to the list items below.|16/9](workflow-parameters.webp 'Create parameters')

To create a parameter:

1. Click the [kbd]+[kbd] button in the parameters section
2. Choose a name for the parameter
3. Assign an optional test value; this value is only available in the editor and will not affect your application in production

In reusable workflows, you can also define callback events. When adding a callback event to your reusable workflow, you can call this event from within the workflow. This allows you to create workflows that can return data or signal various change in state.

![The attributes panel is visible and a workflow named increaseCounter is selected from the workflow list. The dialog for the workflow is open. One callback event has been defined, with the name "Count changed" and a test value of 2.|16/9](workflow-callback-events.webp 'Create a workflow callback event'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-workflow-callbacks?canvas-height=800&canvas-width=1128.1&mode=design&selection=workflows.Zpfk7v.actions.0.default.actions.2.events.tick&rightpanel=events}

Similar to parameters, to create a callback event:

1. Click the [kbd]+[kbd] button in the callback events section
2. Choose a name for the event
3. Assign an optional test value; this value is only available in the editor and will not affect your application in production

## Nodes

A node is an action or a piece of logic that is executed sequentially. Nodes are the visual language in Nordcraft that you use to compose the desired logic. There are several built-in nodes like `Set variable`, `Set session cookies` or `Switch`. You can also call custom [actions](/actions/overview) or reusable workflows. This way you can create nested workflows and individual pieces of logic that are composable.

![The attributes panel is visible on the right of the editor, and a workflow named increaseCounter has been selected from the workflow list, meaning its dialog is open. The plus button has been clicked at the bottom of the workflow, displaying a dropdown menu of available nodes to add to the workflow. There is the option to set variables defined in the component, the option to run the increaseCounter workflow, and to add a switch case. The dropdown list is scrollable so there are more options available which are not visible in the image.|16/9](create-workflow-node.webp 'Create nodes')

To add a node:

1. Click on a [kbd]+[kbd] icon in the workflow
2. Pick a node from the list and click on it

::: tip
You can copy and paste nodes in a workflow or between workflows via the context menu or [kbd]Cmd/Ctrl + C[kbd] and [kbd]Cmd/Ctrl + V[kbd].
:::

### Sequential execution

Workflows execute their nodes sequentially. However, this does not necessarily mean each step waits for the previous one to finish completely, which is what synchronous execution would require.

### Sequential and asynchronous execution

Workflows execute nodes in the order they appear (sequential), but some nodes (like API calls) work asynchronously. This means:

- Nodes are always called in sequence (one after another)
- However, asynchronous nodes may not complete before the next node starts executing
- For asynchronous operations, you need to use callback events to handle their results

This is why some nodes have specific callback events like `On success`, `On error`, or `tick`. These callbacks allow you to define what happens after an asynchronous operation completes.
