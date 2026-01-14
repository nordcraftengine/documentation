---
title: Element panel
description: Customize element styling, attributes and events to control appearance, behavior and interactivity of selected components.
---

# Element panel

The element panel appears in the right side of the editor when an element is selected. It provides detailed controls for the appearance, attributes and interactivity of the selected element.

![The element panel is visible, showing options to switch between the style, attributes, and events view as annotations, relating to the list items below.|16/9](element-panel.webp 'Element panel'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/card?selection=nodes.root&rightpanel=style&canvas-width=800&canvas-height=800}

When you select an element in the canvas or element tree, the element panel displays configuration options for that specific element. The panel has three tabs:

1. [Styling](#style-panel): Configure visual appearance and layout for the element and its children
2. [Attributes](#attributes-panel): Set HTML or component attributes for advanced behaviors
3. [Events](#events-panel): Define workflows triggered by user interactions on the element

## Style panel

The style panel allows you to control the visual appearance of elements and components.

![The Style panel is open showing a number of style properties available to configure on the selected HTML element. It is annotated relating to the list items below.|16/9](element-panel-styling.webp 'Styling'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/card?selection=nodes.root&rightpanel=style&canvas-width=800&canvas-height=800}

1. Add or override [CSS variables](#css-variables)
2. Define [style](#style) variants (e.g. styles for hover, active and disabled states in addition to the default state)
3. Search for CSS properties; if they exist on the style panel you will be taken to that area in the style panel
4. Set [CSS properties](#css-properties) for the selected style variant
5. Use the [CSS editor](#css-editor) to configure styles using standard CSS code

### CSS variables

[CSS variables](/styling/conditional-styles#css-variables) provide a way to store and reuse style values throughout your project in the style panel.

- Create and manage CSS variables that can be referenced in your styles
- Override theme variables at the element level for specific use cases or set a local-only variable
- Set up CSS variables in the formula editor to create dynamic, conditional styles
- Define the type, name and set a unit if needed (e.g. `px`)
- These CSS variables are available for use in CSS properties in the style panel
- Animate or transition CSS variables for smooth visual effects. CSS variables must be defined in your theme with the correct syntax type to be animated correctly.

### Style

The style section manages different visual variants of your element.

- Every element has a `Default` style applied
- Add variants with pseudo-classes (e.g. `:hover`, `:active`, `:focus-visible`) and pseudo-elements (e.g. ::before, ::after, ::selection)
- Create variants using CSS classes you defined in the attributes panel
- Set up responsive styles with media queries for different screen sizes
- Combine classes, pseudo-classes and media queries for more complex style variants
- When styling a component instance, you can select and style a component's class from the outside (see [component style overrides](/styling/conditional-styles#component-style-overrides))

### CSS properties

The CSS properties section provides an interface to set styling properties. All properties defined are generated as pure CSS code in your projects.

- Properties are organized into logical groups like size, layout, text, background, shadow, effects, transform, transition and advanced
- Use the `Advanced` section to set any CSS property not (yet) natively supported
- Use the search field to quickly find specific CSS properties
- View the number of properties set in the current style at the bottom
- Copy and paste styles or switch to the CSS editor view using buttons at the bottom of the panel

### CSS Editor

![The CSS editor is open in the style panel, showing CSS code in an editable IDE-like interface.|16/9](element-panel-css-editor.webp 'CSS editor'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/card-container?rightpanel=style&canvas-width=800&selection=nodes.root&canvas-height=800}

- The CSS editor provides a code view to view and edit styles directly using CSS syntax
- All styles you define using the style panel are displayed, including style variants
- Changes made here are automatically applied to the standard view

This view is particularly useful for developers comfortable with writing CSS directly or for making multiple property changes efficiently.

## Attributes panel

The attributes panel allows you to configure the element HTML tag, attributes, classes and special behaviors like conditional display and repetition for the selected element.

![The attributes panel is visible for the selected HTML element. The HTML element tag is editable via a dropdown, one attribute is specified on the element, and there is an empty classes list and the option to create show formula for this element.|16/9](element-panel-attributes.webp 'Attributes'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/card?selection=nodes.root&rightpanel=attributes&canvas-width=800&canvas-height=800}

### Element tag

- Select the HTML tag for your element (not available for components)
- Changing the tag allows you to modify the element's behavior while preserving its contents and styling

### Attributes

- Add attributes to the element by clicking the [kbd]+[kbd] button and entering a name
- Define attribute values directly or bind them to variables or formulas for dynamic content
- Some element tags have predefined attributes (e.g. `type` for input elements)
- For components, you can only set the attributes that have been specifically defined for that component

### Classes

- Add CSS classes to elements by entering a name and pressing enter
- Bind classes to conditions to apply them dynamically via the `fx` button
- Classes added here can be targeted in the style panel as a style variant
- Classes cannot be added directly to components

### Special behaviors

- **Show**: Control element visibility through conditional formulas that evaluate to `true`/`false`
- **Repeat**: Generate multiple instances of an element based on array data, creating dynamic lists or grids

::: info
See the [show hide formula](/formulas/show-hide-formula) page and [repeat formula](/formulas/repeat-formula) page for more details.
:::

## Events panel

The events panel enables you to define interactive behaviors that respond to user actions on elements.

![The events panel is visible in the right sidebar, showing a number of options to add events to HTML elements, including click events, keyboard events, form, input, touch and mouse events, and more.|16/9](element-panel-events.webp 'Events'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/card?selection=nodes.root&rightpanel=events&canvas-width=800&canvas-height=800}

- Events are categorized into logical groups (click, keyboard, form, input, touch, etc.) for easier navigation
- Events with assigned workflows or actions are highlighted and appear in the **Active** section at the top
- Bind workflows, global actions, or trigger component events to any available event

For a complete list of available HTML element events, refer to the [MDN documentation event reference](https://developer.mozilla.org/en-US/docs/Web/Events).

::: tip
If you cannot find a standard JavaScript event, you can add it under the `Other` section.
:::
