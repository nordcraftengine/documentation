---
title: Show/Hide formula
description: Control element visibility with conditional formulas that add or remove elements from the DOM based on website state or user interactions.
---

# Show/hide formula

The show/hide formula allows you to conditionally render elements based on specific conditions.

@@@ example
componentUrl: https://docs_examples.nordcraft.site/.toddle/custom-element/example-show-hide-formula.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-show-hide-formula?canvas-width=800&rightpanel=attributes&selection=nodes.nQgi8KJ7OPxn9l5H0mML-.condition&canvas-height=800
height: 21rem

See how the show/hide formula controls the visibility of the card based on the toggle button.
@@@

The show/hide formula controls whether an element is displayed or not:

- It evaluates a `Boolean` expression
- If the expression is truthy, the element is shown
- If the expression is falsy, the element is hidden
- The formula is applied by setting the `show` attribute on an element

::: dev
The truthy concept in Nordcraft is similar to JavaScript but follows a more streamlined approach:

- **Falsy values*: `false`, `null` and `undefined`
- **Truthy values**: all other values including empty strings, zero and empty arrays

:::

## Add a show/hide formula

![A show hide formula visible in the formula editor. The fx button next to show is highlighted blue on the right panelshowing the formula is active. The formula uses the isShown variable, which is a boolean, to determin whether to show or hide the selected element, which is a demo-card component.|16/9](show-hide-formula.webp 'Add a show formula'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-show-hide-formula?canvas-width=800&rightpanel=attributes&selection=nodes.nQgi8KJ7OPxn9l5H0mML-.condition&canvas-height=800}

To conditionally show or hide an element:

1. Select the element you want to show and hide based on conditions
2. In the [attributes panel](/the-editor/element-panel#attributes-panel), click the [kbd]fx[kbd] button next to **Show**
3. Enter a formula that evaluates to a `Boolean` value; the element will only be visible when the formula evaluates to `true`

## How show/hide differs from CSS display

Using Nordcraft's show/hide formula is different from setting CSS `display: none` or `visibility: hidden`. Using show/hide, elements or components are completed removed or added to the page when conditions change.

- **Show/hide formula:**
  - Completely removes the element from the page when hidden
  - Adds a new instance of the component or element to the page and reinitializes the initial state when shown
  - No APIs, events or workflows run on hidden elements
- **CSS display/visibility:**
  - The element or component remains on the page but is not visible
  - APIs, events and workflows continue to run
  - No unmounting or remounting occurs when toggling visibility

## Performance considerations

Given elements are removed (unmounted) and added (remounted) when the show/hide condition changes, be aware of these performance implications:

- **Re-initialization**: When an element is added to the page when the show/hide formula evalutes to truthy, all initializations, API calls and `onLoad` events will run again
- **DOM updates**: Hiding and showing elements forces the browser to remove and recreate HTML, which can negatively affect page performance for complex components
- **State loss**: Any internal state not stored in variables will reset when the element is hidden

For most situations, this behavior is ideal. However, if you need to toggle visibility frequently while maintaining state, consider CSS alternatives:

- Use `display: none` to hide the element but preserve its state
- Use `visibility: hidden` to hide the element while maintaining its layout space

::: tip
Hiding and showing elements and components using CSS styles means any HTML for those elements remain on the page. Use this approach when you need to preserve state during frequent visibility changes.
:::
