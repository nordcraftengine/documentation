---
title: Project formulas
description: Create project-wide reusable functions with standard formulas or custom JavaScript code for consistent logic across your components and pages.
---

# Project formulas

Project formulas provide a way to create reusable calculations and logic that can be accessed from any page or component in your project. Unlike component-level formulas that are only available within a specific component, project formulas can be used throughout your entire application.

## When to use project formulas

Project formulas are ideal for:

- Common calculations used across multiple components
- Shared data transformations
- Utility functions like date formatting or number parsing
- Business logic that needs to be consistent throughout the application
- Complex operations that might be reused

Using project formulas ensures consistency in your application and reduces duplication of code.

## Create a project formula

Project formulas appear in the formula selection dropdown throughout your project, making them easily accessible from any component or page.

![The project sidebar is visible in the editor, showing a list of formulas in the formula section. Formulas are named, for example, getCssVariable, getDefaultTrue, getTradition. On the left, the getDefautTrue formula editor is visible, showing a snapshot of the formula notes that make up this formula. The formula takes an input of name value, and checks to see if it equals false. Further logic is calculated in an if formula node. If it equals false, if returns false, else it returns true. Tne image is also annotated with numbers that correspond to the list items below.|16/9](create-a-project-formula.webp 'Create a project formula'){https://editor.nordcraft.com/projects/docs_examples/branches/main/formulas/getDefaultTrue?canvas-height=800&canvas-width=800&rightpanel=attributes}

To create a project formula:

1. Open the [project sidebar](/the-editor/project-sidebar) by clicking the folder icon or using [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd]
2. Find the **Formulas** section, click the [kbd]+[kbd] button and enter a name for your formula in the dialog
3. Add arguments as input parameters with test values (optional)
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
- **Client-side only**: Custom code formulas execute in the browser only and not during server-side rendering; this can cause layout shifts during page load and may impact your page performance scores, and as a result, SEO
- **Synchronous execution**: Custom formulas must be synchronous; do not use `Promise`, `fetch` or other asynchronous JavaScript APIs in project formulas
- **Shadow DOM compatibility**: When components are exported as web components, use `ctx.root` instead of `document` to access DOM elements; this ensures compatibility with Shadow DOM encapsulation

::: warning
Avoid adding side effects in custom formulas. Side effects can cause unpredictable behavior and should be handled by [actions](/actions/overview) instead.
:::

::: danger
Be cautious when pasting code snippets from external sources into custom formulas. Custom code can execute any JavaScript you add, which may introduce security vulnerabilities if you do not trust the source.
:::
