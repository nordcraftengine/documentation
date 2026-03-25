---
title: Formulas overview
description: Understand Nordcraft's formula editor to create data transformations, calculations, and conditional logic.
---

# Formulas

The formula editor is where you build logic for your website in Nordcraft. It provides a powerful way to transform data, perform calculations, and implement conditional logic throughout your project.

Formulas in Nordcraft:

- Perform logical operations and data transformations
- Execute mathematical calculations
- Filter, search, and manipulate data
- Return consistent results for the same inputs

::: info
Most formulas in Nordcraft are [pure functions](https://www.geeksforgeeks.org/pure-functions-in-javascript). A pure function always returns the same result for the same input values, and does not change anything outside of itself.
:::

## The formula editor

![The formula editor is open and expanded to full screen, showing a formula named mapped. 6 nodes are used to build a new array from an array _MOVIES, using the lowercase formula, the Set formula, and the Map formula.|16/9](the-formula-editor.webp 'Formula editor'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-map-formula?canvas-width=800&canvas-height=800&selection=formulas.2q0_dN&rightpanel=style}

You can use the formula editor wherever you see the [kbd]fx[kbd] button in the Nordcraft editor, including:

- In the [attributes panel](/the-editor/element-panel#attributes-panel) when binding values
- In the [Show/hide](/formulas/show-hide-formula) and [Repeat](/formulas/repeat-formula) formula sections
- In the [CSS variables](/styling/conditional-styles#css-variables) panel
- In the [data panel](/the-editor/data-panel) when defining formulas

In the formula editor, you can:

- Reference variables, attributes, and other data
- Use built-in functions and operators
- See a live preview of the formula output as you type and edit your formula

### Full-screen mode

For larger formulas, Nordcraft provides a full-screen view of the formula editor. To open the formula editor in full-screen mode, click the four-arrow icon button in the top-right corner of the formula editor.

## Formula foundations

Built on the same concepts as the web platform, Nordcraft offers many built-in formulas that align with similarly named JavaScript functions. Familiarity with these JavaScript concepts can help you create more effective formulas:

- [Array methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array_methods_and_empty_slots) (map, filter, reduce, etc.)
- [Object methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) (keys, values, entries, etc.)

::: tip
For a guided tour of the formula editor, check out the following lesson from the [Nordcraft Fundamentals](https://nordcraft.com/learn/fundamentals) video course.
:::

@@@ youtube
videoId: K5aJNBH-yhY
title: Get to know the Nordcraft formula editor
@@@
