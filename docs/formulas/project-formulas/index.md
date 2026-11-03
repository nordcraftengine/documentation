---
title: Project formulas
description: Create project-wide reusable functions with standard formulas or custom JavaScript code for consistent logic across your components and pages.
---

# Project formulas

Using project formulas, you can create reusable calculations and logic that can be accessed from any page or component in your project. Unlike component-level formulas that are only available within a specific component, project formulas can be used throughout your entire project.

## When to use project formulas

Project formulas are ideal for:

- Common calculations used across multiple components
- Shared data transformations
- Utility functions like date formatting or number parsing
- Logic that needs to be consistent throughout the project
- Complex operations that might be reused

## Create a project formula

Project formulas appear in the formula selection dropdown throughout your project, making them easily accessible from any component or page.

![The formulas drawer is open in the left sidebar showing project formulas. On the right, the formula editor is open.|16/9](create-a-project-formula.webp 'Create a project formula'){https://editor.nordcraft.com/projects/docs_examples/branches/main/formulas/getDefaultTrue?canvas-height=800&canvas-width=800&rightpanel=attributes}

To create a project formula:

### Using the command palette (recommended)

1. Press [kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]K[kbd] to open the [command palette](/the-editor/command-palette) in action mode
2. Select **Create formula** (or type "Create formula" and press [kbd]↵[kbd])
3. Enter a name for your formula in the dialog

### Using the sidebar

1. Click the [kbd]Formulas[kbd] button in the left sidebar to open the list of formulas
2. Click the [kbd]+[kbd] button at the top of the list and enter a name for your formula in the dialog
3. Add input parameters with test values (optional)
4. Add a description to your formula (optional)
5. Define your formula logic using either
   **(A)** The formula editor, or
   **(B)** Click the [kbd]Convert to code formula[kbd] button at the bottom left of the screen to view the JavaScript code editor

::: info
Clicking `Convert to code formula` will **not** convert existing formula nodes to JavaScript code. Instead, it will switch the formula editor view to the raw code view.

Decide whether you want to use the formula editor or the custom code view **before** you start working in order to prevent losing any changes unexpectedly.
:::

## Custom code formulas

Custom code formulas extend the capabilities of the standard formula editor by allowing you to write JavaScript directly. This enables you to implement functionality that isn't available through the built-in formula components.

![The custom code formula editor is visible. On the left the formula contains a description and a single input argument named value, with a type of unknown. On the right is a text editor that looks like an IDE, containing a short function named hasValue, which takes the value argument, and processes some logic.|16/9](global-custom-code-formula.webp 'Custom code formula'){https://editor.nordcraft.com/projects/docs_examples/branches/main/formulas/hasValue?canvas-height=800&canvas-width=800&rightpanel=attributes}

### Custom code structure

In the custom code editor, your formula must have an entry function with the same name as your formula. This function receives two parameters:

- `args`: The defined input parameters passed to your formula
- `ctx`: The context object that provides access to Nordcraft-specific functionality

### Custom code considerations

When using custom code in project formulas, keep these important points in mind:

- **Pure functions**: Custom formulas should be pure functions without side effects; given the same inputs, they should always return the same outputs without modifying external state
- **Client-side only**: Custom code formulas run in the browser only and not during server-side rendering; this can cause layout shifts during page load and may impact your page performance scores, and as a result, SEO
- **Synchronous execution**: Custom formulas must be synchronous; do not use `Promise`, `fetch` or other asynchronous JavaScript APIs in project formulas
- **Shadow DOM compatibility**: When components are exported as web components, use `ctx.root` instead of `document` to access DOM elements; this ensures compatibility with Shadow DOM encapsulation

::: warning
Avoid adding side effects in custom formulas. Side effects can cause unpredictable behavior and should be handled by [actions](/actions/overview) instead.
:::

::: danger
Be cautious when pasting code snippets from external sources into custom formulas. Custom code can execute any JavaScript you add, which may introduce security vulnerabilities if you do not trust the source.
:::
