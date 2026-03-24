---
title: Styles and layout
description: Apply styles using the style panel or CSS editor, using flexbox and text layout options to arrange and present content.
---

# Styles and layout

The style panel in Nordcraft helps you write CSS code for your website in a visual interface. This approach lets you style elements on the canvas in real time without writing code, all while generating pure CSS. For more precise control, you can also edit CSS code directly in the CSS editor.

## Adding CSS with the style panel

![The Styling panel is selected and visible to the right of the canvas , showing some basic styling applied including a flex gap, padding and width.|16/9](styling-panel.webp 'Styling panel'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/card?selection=nodes.root&rightpanel=style&canvas-width=800&canvas-height=800}

- Properties are grouped by category (**Size**, **Layout**, **Text**, etc.)
- Each group contains specific controls for each property (color pickers, dropdowns, etc.)
- You can find properties using the search field at the top of the style panel
  - Type any property name in the search field
  - Select the property from the search results
  - You will be navigated to that property, ready to enter a value
- You can add CSS properties and values not currently supported by the style panel in the **Advanced** section

::: tip
For a guided tour of the style panel, check out the following lesson from the [Nordcraft Fundamentals](https://nordcraft.com/learn/fundamentals) video course.
:::

@@@youtube
videoId: pD4gcqrqnlI
title: Get to know the Nordcraft style panel
@@@

## Styling with the CSS editor

If you prefer writing CSS code:

- Access the [CSS editor](/the-editor/element-panel#css-editor) by clicking the [kbd]{ }[kbd] button at the bottom of the [style panel](/the-editor/element-panel#style-panel)
- View all defined styles and their properties in one place, including CSS keyframe animations
- Write traditional CSS syntax
- Switch between the style panel and CSS editor view, where your CSS will be automatically updated between the different views

![The CSS editor is visible in the right panel, showing pure CSS rules defined for a section element. This is pure CSS, just as you would write in code or you would view in the browser dev tools.|16/9](css-editor.webp 'CSS editor'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/card-container?rightpanel=style&canvas-width=800&selection=nodes.root&canvas-height=800}

::: tip
The CSS editor supports multiline CSS values for CSS properties such as `grid-template-areas`. To add a new line to a value, press [kbd]Shift[kbd]+[kbd]Enter[kbd].
:::

## Copy and paste styles

You can copy and paste CSS between elements:

1. Select the element with the styles you want to copy
2. Click the [kbd]Copy properties[kbd] button at the bottom of the style panel
3. Select the target element where you want to apply these styles
4. Click the [kbd]Paste properties[kbd] button at the bottom of the style panel

## Layout in Nordcraft

### Flexbox layout

By default, Nordcraft uses the flexbox system for layout. Flexbox is a layout system that allows control over the layout of child elements, referred to as `flex items`. Using flexbox, space between and alignment of child elements can be automatically distributed, all without margins or media queries.

::: tip
Flexbox provides many useful layout features. To learn more, check out the following lesson from the [Nordcraft Fundamentals](https://nordcraft.com/learn/fundamentals) video course.
:::

@@@youtube
videoId: qOkPPLTi_Ns
title: Layouts: the display property
@@@

### Text layout

When working with text content, Nordcraft defaults to **Text** layout:

- In CSS, this is called **flow layout**
- Text flows naturally according to the writing mode of the document (e.g. the `direction` such as `left-to-right` or `right-to-left`, the `text-orientation`, and more)
- Words wrap to the next line when they reach the container's edge
- This layout is optimized for reading and text-heavy content

::: tip
If you want to know more about how to apply responsive design in Nordcraft, check out the [blog post about responsive design in Nordcraft](https://blog.nordcraft.com/how-nordcraft-thinks-about-responsive-design).
:::
