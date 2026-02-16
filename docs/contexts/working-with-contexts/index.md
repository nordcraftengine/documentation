---
title: Working with contexts
description: Implement context providers and consumers to share data and functions between ancestor and descendant components.
---

# Working with contexts

Contexts enable direct communication between ancestor and descendant components without going through intermediate components, allowing you to avoid "attribute drilling", which is where you pass data through intermediate components that don't need access to it, just to reach components deeper in the tree.

## Create a context provider

To create a context provider, you can expose formulas or workflows from a component.

### Expose a formula in context

![The formula editor is open, consisting of a single node that returns a count variable. To the left, underneath the formula name and the formula inputs, there is a checked checkbox with the label expose in context. The image is annotated according to the list items below.|16/9](expose-a-formula.webp 'Expose a formula'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/counter-with-context?canvas-width=800&rightpanel=style&selection=formulas.rQmmU7&canvas-height=800}

1. In the component's [data panel](/the-editor/data-panel), navigate to the **Formulas** section and [create a new formula](/formulas/working-with-formulas#create-a-formula) or select an existing one
2. Check the [kbd]Expose in context[kbd] checkbox in the [formula-editor](/formulas/overview#the-formula-editor)

The formula will now be available to all descendant components through context.

### Expose a workflow in context

![The workflow editor is open showing a switch case node, which checks to see if a counter should decrease. At the top of the workflow next to the workflow name, there is a checked checkbox with the label expose in context. The image is annotated according to the list items below.|16/9](expose-a-workflow.webp 'Expose a workflow'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/counter-with-context?canvas-width=800&canvas-height=800&selection=workflows.P_Trdl&rightpanel=style}

1. In the component's [data panel](/the-editor/data-panel), navigate to the **Workflows** section and [create a new workflow](/workflows/working-with-workflows) or select an existing one
2. Check the [kbd]Expose context[kbd] checkbox next to the workflow name in the details panel

You can now trigger the workflow directly in any descendant component.

::: tip
To share a variable's value through context, create a formula that returns the variable and expose it in the context. For variable modification, create and expose a workflow that updates the variable.
:::

## Using contexts in components

Components can only access contexts from ancestors in the component tree. The context provider must be higher in the hierarchy than the component using the context.

![The attributes panel is visible on the right of the editor, showing a context in the contexts section named counter-root. This context is selected, and the context dialog is open. A checkbox next to the count formula is selected, giving the component access to the count formula defined higher up in the component tree.|16/9](use-context.webp 'Use context'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/counter-with-context-display?canvas-width=800&rightpanel=style&canvas-height=800}

To enable a component to use context from an ancestor:

1. In the selected component, navigate to the **Contexts** section in the [data panel](/the-editor/data-panel) and click the [kbd]+[kbd] button to add a context reference
2. Select the ancestor component that provides the context (only components that expose context will appear in the list)
3. Check the specific formulas and workflows you need to access

When you enable this, the selected formulas and workflows become available in the component:

- Context formulas can be used in any formula editor within the component
- Context workflows can be triggered from any workflow or event handler within the component

::: info
When multiple ancestor components provide the same context, the closest ancestor takes precedence.
:::

## Example

The following example shows how to set up and use contexts with a simple counter implementation. One counter demonstrates a provider that exposes count and increments through context, while the other shows the same counter built with attribute passing for comparison.

@@@ example
componentUrl: https://docs_examples.nordcraft.site/.toddle/custom-element/example-contexts.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-contexts?mode=design&canvas-width=808&rightpanel=attributes&canvas-height=800
height: 11rem

The left counter uses contexts to share count and increment function with descendant components. The right counter relies on attributes to pass this information down to child components.
@@@
