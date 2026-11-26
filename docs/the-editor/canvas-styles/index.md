---
title: Canvas styles
description: Set the layout, background and typography of the editor canvas for a single component or page, or as defaults for every file in your project.
---

# Canvas styles

Canvas styles control how the canvas behind your component or page looks in the editor. Use them to preview a component in the context it is used in, for example on a dark background, centered on the canvas, or with the font it inherits from the page around it, without adding those styles to the component itself.

You can set canvas styles in two places:

- **[Component and page canvas styles](#component-and-page-canvas-styles)**: Apply to the canvas of a single component or page, and are set in the right panel
- **[Default canvas styles](#default-canvas-styles)**: Apply to the canvas of every component and page in your project, and are set in the project config

## Why use canvas styles

Components are often designed to inherit styles from where they are used. A card may get its font family from the page, or a button may be designed to sit on a dark header. When you open these components on their own, the canvas does not have that context, so they can look different from how they look on your website.

Canvas styles give the canvas that context. You can:

- Set a background to preview components that are designed for light or dark surfaces
- Set the font family, weight and size that the component would normally inherit
- Use layout properties to center a component or add space around it
- Define CSS variables that the component expects a parent element to set

::: info
Canvas styles only apply to the canvas in the editor. They are not added to your components or pages, so they do not change how your website looks.
:::

## Component and page canvas styles

To set canvas styles for the component or page you have open:

1. Deselect all elements by pressing [kbd]Escape[kbd] or clicking the background outside the canvas
2. In the right panel, switch from the [kbd]Data[kbd] tab to the [kbd]Canvas style[kbd] tab
3. Set the styles you want to apply to the canvas

The canvas style tab has the following sections:

- **CSS variables**: Click [kbd]+[kbd] to define [CSS variables](/styling/conditional-styles#css-variables) that are available to everything on the canvas
- **Layout**: Set the display type, direction, alignment and spacing of the canvas, for example to center a small component
- **Typography**: Set the text alignment, font family, weight, size and style
- **Background**: Set the background of the canvas

## Default canvas styles

Default canvas styles apply to the canvas of every component and page in your project. Use them to set a base, such as your website's font family and background color, so you don't have to repeat it for each component.

To set default canvas styles:

1. Click the [kbd]Config[kbd] button in the [project sidebar](/the-editor/project-sidebar)
2. Expand the **Default canvas styles** section in the project config
3. Set the CSS variables, typography and background you want to apply to every canvas

## How canvas styles are combined

When a component or page has its own canvas styles, they are applied on top of the default canvas styles. A property set in the component or page canvas styles overrides the same property from the defaults, and all other defaults still apply.

::: tip
Set the styles shared by most of your project, such as the font family and text color, in the default canvas styles. Use component or page canvas styles only for the files that need a different context, such as a footer that sits on a dark background.
:::

To style the elements of your website itself, use [themes](/styling/themes) and the [style panel](/the-editor/element-panel#style-panel).
