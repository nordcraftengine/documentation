---
title: Conditional styles
description: Implement responsive and state-dependent styling with pseudo classes, CSS classes and CSS variables.
---

# Conditional styles

Using the style panel you can configure different styling for when elements are hovered, focussed, active, disabled and so on, create different styles for elements based on the browser viewport height and width, and control the appearance of a specific part of that element, such as the first letter, or first line. In Nordcraft, we call these style variants.

## Style variants

If you’re familiar with CSS terminology, style variants allow you to configure pseudo classes, pseudo elements and media queries, and change styling based on [CSS classes](#class-based-styles) or [CSS variables](#style-variables).

@@@ example
componentUrl: https://docs_examples.nordcraft.site/.toddle/custom-element/example-style-variants.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-style-variants?canvas-width=800&rightpanel=style&selection=nodes.RXXxhmSNTU21VntB7mKuh&canvas-height=800
height: 18rem

Hover or tap the card to see the style change. This is achieved by setting the `:hover` pseudo-class.
@@@

In the **Style** section at the top of the style panel, you can create style variants that apply when specific conditions are met:

- Pseudo-classes (`:hover`, `:active`, `:focus`, etc.)
- [Classes](#class-based-styles) defined in the [attributes panel](/the-editor/element-panel#attributes-panel)
- Media queries for different screen sizes
- [Starting style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- Pseudo-elements (`::before`, `::after`, etc.)

::: info
Conditional styles will always be visible on the selected element on the canvas, even if the condition is not currently met.
:::

### Pseudo-classes

Nordcraft supports standard CSS pseudo-classes. Pseudo-classes target elements in specific states, such as `:hover`, `:focus`, `:checked`, `:visited` or `:disabled`.

::: info
For a complete list of pseudo-classes, see the [MDN documentation on pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes).
:::

### Pseudo-elements

In addition to pseudo-classes, Nordcraft includes support for standard CSS pseudo-elements, which allow you to style specific parts of an element that don't appear in the element tree, such as `::before`, `::after`, or `::placeholder`.

::: info
For more information on pseudo-elements, see the [MDN documentation on pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements).
:::

## Class-based styles

You can add classes to elements using the attributes panel, and then create conditional styles for those classes.

@@@ example
componentUrl: https://docs_examples.nordcraft.site/.toddle/custom-element/example-class-based-style.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-class-based-style?mode=design&selection=nodes.RXXxhmSNTU21VntB7mKuh&canvas-width=800&rightpanel=attributes&canvas-height=800
height: 18rem

Click to select and unselect the card.
@@@

1. Add a class name in the **Classes** section of the [attributes panel](/the-editor/element-panel#attributes-panel)
2. Create a new style variant in the [style panel](/the-editor/element-panel#style-panel) by selecting that class name
3. Define the styles that should apply when the class is applied

Classes can be conditionally applied using formulas, variables, or attributes. If the condition evaluates to a truthy value, the class and its associated styles will be applied.

::: info
Class-based styling is available for HTML elements only, not components.
:::

### Classes in Nordcraft

Classes in Nordcraft are scoped to the element where they're defined:

- Styles added to a class only apply to the specific element where they're created
- Classes are not automatically shared between elements

## CSS variables

@@@ example
componentUrl: https://docs_examples.nordcraft.site/.toddle/custom-element/example-style-variables.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-style-variables?rightpanel=style&canvas-width=800&selection=nodes.RXXxhmSNTU21VntB7mKuh.style-variables.0.formula&canvas-height=800
height: 18rem

CSS variables create dynamic styles based on state. Click the card to toggle its selected state, which dynamically changes the border, background, and text colors.
@@@

Create CSS variables with dynamic values by binding them to formulas, attributes, or variables:

1. Define or override CSS variable in the [CSS variables](/the-editor/element-panel#style-panel) section
2. Use the [formula editor](/formulas/overview#the-formula-editor) to create conditional logic
3. Reference the variable in your CSS properties

## Cascade and precedence

@@@ example
componentUrl: https://docs_examples.nordcraft.site/.toddle/custom-element/example-style-cascade.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-style-cascade?rightpanel=style&canvas-width=800&selection=nodes.725KDMmepSbJecZCQqInN&canvas-height=800
height: 19rem

This example demonstrates how style order affects cascade behavior with multiple variants. In the first card, selected class overrides hover effect since selected comes later in the cascade. In the second card, hover effect remains visible when selected because hover comes after selected in the cascade.
@@@

Styles in Nordcraft follow the CSS cascade rules. In traditional text-based coding, multiple CSS rules can be defined in multiple places for any single HTML element in different ways, and the cascade is an algorithm that defines how browsers will combine those rules originating from different sources to decide on the final result. Cascade means to fall downwards. This refers to how, in traditional text-based coding, the last CSS rule for an element down at the bottom of a style sheet will take precedence in most cases, unless a CSS rule with more specificity, that is a rule targeting an element in a more specific way, has been found higher up in the cascade. The same applies for styling in Nordcraft.

- When multiple style variants apply to an element, all their properties cascade together
- The order of style variants in the style panel matters — **later styles override earlier ones**
- More specific selectors take precedence
- For example, if both a `.selected` class and a `:hover` pseudo-class define `background-color`:
  - If `.selected` is defined after `:hover` in the style list, the `.selected` color will show even when hovering
  - If `:hover` is defined after `.selected`, the hover color will show when hovering over a selected element

::: tip
When adding conditional styles, pay careful attention to the order of your style variants. You can drag and reorder them in the style panel to achieve the desired cascade behavior.
:::

## Responsive breakpoints

You can create layouts that adapt to different screen sizes using media queries.

When adding a new style variant, you can set media query conditions:

- Set `viewport width` or `viewport height` above or below specific values
- Define different layouts optimized for various screen sizes
- Combine media queries with other conditions for complex responsive behavior

## Component style overrides

Components can be styled from the outside, allowing for customization of specific instances without affecting others.

@@@ example
componentUrl: https://docs_examples.nordcraft.site/.toddle/custom-element/example-component-styling.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-component-styling?rightpanel=style&canvas-width=800&selection=nodes.mkJ0CrlLDvzUaWYSW_B8Q&canvas-height=800
height: 23rem

Component instances can be styled individually without affecting others. This demonstrates customized background and border colors with a hover state on one card, while the standard version remains unchanged.
@@@

### How component styling works

When you style an instance of a component:

- Styles are applied only to that specific instance, not to the other instances of the component
- Only the root element of the component can be styled from outside
  - Elements deeper in the component tree are not affected
  - If a component has a slot as its root element, it cannot be styled from the outside

This approach allows you to customize individual component instances when needed, while maintaining the component's encapsulation and reusability.

### Conditional styles on components

To apply conditional styling to a component instance:

1. Select the component in the canvas or element tree
2. Add a style in the [style panel](/the-editor/element-panel#style-panel)
3. Choose from available pseudo-classes, media queries and pseudo-elements
4. If the component has classes on its root element, these will appear in the **Class** selection dropdown
5. If the component has CSS variables defined on its root element, these will appear in the **CSS variables** section to override.

For consistent styling across multiple components, consider adding conditional classes or creating component variants rather than styling individual instances, providing more maintainable solutions.

### Component styling limitations

When styling component instances, there are some limitations:

- You cannot add classes directly to components in the attributes panel
- Only classes that exist on the root element of the component can be styled from outside
- You cannot style elements deeper in the component tree hierarchy
