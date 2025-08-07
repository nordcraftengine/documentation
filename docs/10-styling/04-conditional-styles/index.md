---
title: Conditional styles
description: Implement responsive and state-dependent styling with pseudo classes, CSS classes and style variables for dynamic user interfaces.
---

# Conditional styles

Conditional styles allows you to create specific variations of an element's appearance that only apply in certain circumstances. This approach enables dynamic interfaces that respond to user interactions, screen sizes, and application states.

There are several methods to apply conditional styles in Nordcraft:

- [Style variants](#style-variants) via pseudo-classes, pseudo-elements, and media-queries
- Style variants via [classes](#class-based-styles)
- [Style variables](#style-variables)

## Style variants

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-style-variants.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-style-variants?canvas-width=800&rightpanel=style&selection=nodes.RXXxhmSNTU21VntB7mKuh&canvas-height=800
height: 18rem

Hover or tap the card to see the style change. This is achieved by setting the `:hover` pseudo-class.
@@@

In the **Style** section of the style tab panel, you can create additional style variants that apply only when specific conditions are met:

- Pseudo-classes (`:hover`, `:active`, `:focus`, etc.)
- [Classes](#class-based-styles) defined in the [attributes tab](/the-editor/element-panel#attributes-tab)
- Media queries for different screen sizes
- [Starting style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style)
- Pseudo-elements (`::before`, `::after`, etc.)

::: info
While editing in the canvas, conditional styles will always be visible on the selected element for preview purposes, even if the condition is not currently met.
:::

### Pseudo-classes

The style system in Nordcraft supports standard CSS pseudo-classes. Pseudo-classes target elements in specific states, such as `:hover`, `:focus`, `:checked`, or `:disabled`.

::: info
For a complete list of pseudo-classes, see the [MDN documentation on pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes).
:::

### Pseudo-elements

In addition to pseudo-classes, Nordcraft includes support for standard CSS pseudo-elements, which allow you to style specific parts of an element that don't appear in the element tree, such as `::before`, `::after`, or `::placeholder`.

::: info
For more information on pseudo-elements, see the [MDN documentation on pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements).
:::

## Class-based styles

You can add classes to elements using the attributes tab, and then create conditional styles for those classes.

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-class-based-style.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-class-based-style?mode=design&selection=nodes.RXXxhmSNTU21VntB7mKuh&canvas-width=800&rightpanel=attributes&canvas-height=800
height: 18rem

Click to select and unselect the card.
@@@

1. Add a class name in the **Classes** section of the [attributes tab](/the-editor/element-panel#attributes-tab)
2. Create a new style variant in the [style tab](/the-editor/element-panel#style-tab) by selecting that class name
3. Define the styles that should apply when the class is applied

Classes can be conditionally applied using formulas, variables, or attributes. If the condition evaluates to a truthy value, the class and its associated styles will be applied.

::: info
Class-based styling is available for HTML elements only, not for components.
:::

### Classes in Nordcraft

Classes in Nordcraft are scoped to the element where they're defined:

- Styles added to a class only apply to the specific element where they're created
- Classes are not automatically shared between elements
- For reusable styles across multiple elements, create components instead

This approach maintains clean separation and prevents unintended style conflicts in your application.

## Style variables

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-style-variables.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-style-variables?rightpanel=style&canvas-width=800&selection=nodes.RXXxhmSNTU21VntB7mKuh.style-variables.0.formula&canvas-height=800
height: 18rem

Style variables create dynamic styles based on state. Click the card to toggle its selected state, which dynamically changes the border, background, and text colors.
@@@

Create style variables with dynamic values by binding them to formulas, attributes, or variables:

1. Define a style variable in the [Style variables](/the-editor/element-panel#style-tab) section
2. Use the [formula editor](/formulas/overview#the-formula-editor) to create conditional logic
3. Reference the variable in your CSS properties

This approach is particularly useful for complex conditional styling that depends on application state or dynamic data.

## Cascade and precedence

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-style-cascade.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-style-cascade?rightpanel=style&canvas-width=800&selection=nodes.725KDMmepSbJecZCQqInN&canvas-height=800
height: 19rem

This example demonstrates how style order affects cascade behavior with multiple variants. In the first card, selected class overrides hover effect since selected comes later in the cascade. In the second card, hover effect remains visible when selected because hover comes after selected in the cascade.
@@@

Styles in Nordcraft follow CSS cascade rules, which determine which styles take precedence when multiple styles apply to the same element:

- When multiple style variants apply to an element, all their properties cascade together
- The order of style variants in the style panel matters — **later styles override earlier ones**
- Specificity also plays a role, with more specific selectors taking precedence
- For example, if both a `.selected` class and a `:hover` pseudo-class define `background-color`:
  - If `.selected` is defined after `:hover` in the style list, the `.selected` color will show even when hovering
  - If `:hover` is defined after `.selected`, the hover color will show when hovering over a selected element

::: tip
When setting up conditional styles, pay careful attention to the order of your style variants. You can drag and reorder them in the style panel to achieve the desired cascade behavior.
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
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-component-styling.js
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
2. Add a style in the [style tab](/the-editor/element-panel#style-tab)
3. Choose from available pseudo-classes, media queries and pseudo-elements
4. If the component has classes on its root element, these will appear in the **Class** selection dropdown

For consistent styling across multiple components, consider adding toggleable classes or creating component variants rather than styling individual instances, providing more maintainable solutions.

### Component styling limitations

When styling component instances, there are some limitations:

- You cannot add classes directly to components in the attributes tab
- Only classes that exist on the root element of the component can be styled from outside
- Style variables cannot be added to components
- You cannot style elements deeper in the component tree hierarchy
