---
title: Theme
description: Create design systems with Nordcraft's theme tools for managing colors, spacing, typography, fonts, and more across your project.
---

# Theme

The theme system in Nordcraft provides a centralized way to manage design tokens across your entire project. By defining colors, spacing, typography and other visual elements in one place, you can ensure consistent styling throughout your application. All theme variables are available to use in the [style panel](/the-editor/element-panel#style-panel).

To access the theme editor, open the [project sidebar](/the-editor/project-sidebar#project-sidebar) and find the `Themes` section. You can also open the theme dialog from the [bottom-bar](/the-editor/bottom-bar#bottom-bar) when editing a component. Here you can edit your theme with a live view of your changes in context.

![The Nordcraft theme editor. On the left is the CSS variable grouping. On the central canvas, a table of theme variables are displayed with their type inputs.|16/9](theme.webp 'Theme'){https://editor.nordcraft.com/projects/docs_examples/branches/main/themes/Default?canvas-width=800&canvas-height=800&rightpanel=style}

## Theme variables

Theme variables are used to declare CSS variables at a global level for your project. These variables can then be referenced throughout your application to ensure consistent styling.

When creating a new theme variable, you define:

- **Name**: A unique identifier for the variable. Use kebab-case (e.g., `primary-color`, `button-height`). Splitting words with a double hyphen (e.g., `button--height`) will group the variable in the theme editor for better organization.
- **Syntax type**: The type of value the variable holds (e.g., color, length-percentage, font-family, number, etc.). See the sections below for details on each syntax type.
- **Initial value**: The initial value assigned to the variable if no theme value override is applied. This value will also be used if you decide to reset the variable to its default state using the CSS `initial` keyword.
- **Description**: A brief explanation of the variable's purpose. This is optional and only in the editor for reference.
- **Inherits**: Specifies if the variable should inherit value. Default is true. Unchecking this option will cause the initial value to always be used or any override value set at the element level.

:::tip
When using a CSS variable in transition or animations, unchecking `Inherits` can have a positive effect on performance as the browser can simplify the number of style checks. Effectively making it as performant as setting CSS variables on the style attribute.
:::

Picking the correct syntax type for theme variables is important as it determines how the variable can be used in your project. Below are the available syntax types and their use cases:

### Syntax: Any(\*)

The `Any(*)` syntax type allows you to create theme variables that can hold any CSS value. This is useful for properties that may require different types of values depending on the context or complex CSS values that are not yet supported as specific syntax types.

Note that when using `Any(*)` variables, the variable will show up in all style property dropdowns, which may lead to confusion if the variable is not compatible with the selected property.

Using `Any(*)` will also require you to manually type the value, as the variable will not provide type-specific input controls (e.g., color picker, spacing units).

### Syntax: Angle

Angle variables are useful for defining rotation values in transformations or gradient angles. This helps maintain consistency in visual effects that involve angular measurements.

### Syntax: Color

Color variables can be used for backgrounds, gradients, borders, shadows, text colors, and more throughout your application. Editing a color variable will provide a color picker.

Nordcraft does not enforce any color naming conventions, but deciding on a color scheme helps establish a consistent visual identity. Consider creating variables for:

- Primary colors (e.g., `primary`, `secondary`, `accent`)
- Neutral colors (e.g., `background`, `surface`, `text-primary`, `text-secondary`)
- Status colors (e.g., `success`, `error`, `warning`, `info`)
- Shades and tints (e.g., `gray-100`, `gray-200`, `gray-300`)

### Syntax: Length-percentage

Spacing variables help maintain consistent layout measurements throughout your application:

- Create dimension-related variables such as margin and padding
- Define font-size variables for consistent typography scaling

### Syntax: Percentage

Percentage variables is a subset of length-percentage variables where only percentage values are allowed. These are useful for defining relative sizes, such as widths or heights based on parent elements.

### Syntax: Number

Numbers are useful for defining values that require decimal precision, such as opacity levels, scaling factors, or other numeric properties that benefit from fractional values.

### Syntax: Time

Time variables are used for defining durations in animations and transitions. By standardizing time values, you can ensure consistent timing across various interactive elements in your application.

### Syntax: Integer

Integers are mostly used for handling z-index throughout your interface, but can also be used for font-weight management.
A well-structured z-index system prevents unintended overlapping issues in complex interfaces.

### Syntax: Font-family

Select and manage typography for your project:

- Choose and install fonts from available Google fonts
- Change font families based on the active theme

Once added, these fonts become available in the font dropdown menu in the [style panel](/the-editor/element-panel#style-panel).

#### Custom fonts

For fonts not available natively in Nordcraft, add them in your [page configuration](/pages/page-configuration). Navigate to the [head assets](/pages/page-configuration#head-assets) section to set up custom fonts.

::: info
Fonts added via page configuration will only be available on the specific page where you add them. To use custom fonts across your entire project, add them to each page that requires them.
:::

## Multiple themes

Each theme variable you add can have different values across multiple themes. This allows you to create light and dark themes or different color schemes for various contexts.

To create and manage multiple themes:

1. Open the theme editor from the [project sidebar](/the-editor/project-sidebar#project-sidebar)
2. Click the `+` button next to your themes row or duplicate an existing theme using the context menu of an existing theme
3. Define different values for your theme variables in each theme

You can preview themes in the editor by right-clicking on the theme name in the theme editor and selecting `Emulate theme`. You can also mark a theme as the default theme for your project using the same context menu or set it as the default Dark or Light theme.

### Default theme

The default theme is applied to your project unless a different theme is explicitly selected. You can change the default theme at any time in the theme editor, but you can only have one default theme per project.

All other themes will fall back to the default theme for any variables not explicitly defined in that theme.

### Dark and Light themes

You can mark one theme as the default Dark theme and one as the default Light theme. This allows you to set up automatic theme switching based on user preferences or system settings.

When a user has a preference for dark mode enabled in their operating system or browser, the default Dark theme will be applied. Conversely, if they prefer light mode, the default Light theme will be used.

### Setting a theme programmatically

You can set themes programmatically using the `Set theme` action in workflows. Similarly, you can read the current theme using the `Theme` formula.

Themes are set at a page level in this way, but you can also set themes at any element level by adding the special `data-nc-theme` attribute to an element using the [attributes panel](/the-editor/element-panel#attributes-panel). This allows you to create components or sections of your application that use a different theme than the rest of the page. The element and all its children will use the specified theme.

By default, the `Set theme` action will reactively (immediately) update the theme when triggered and store the selected theme in a cookie (this ensures SSR compatibility). You can override the default behavior in any page's [page configuration](/pages/page-configuration) under the `Themes` section to read the theme from local storage, variable or an API for example.

### Dynamic themes

Nordcraft themes are static by default, meaning that theme variables cannot be set using formulas or dynamic values. However, you can create dynamic themes (loading from an API etc.) by creating a custom theme-provider component that overrides all your theme variables using dynamic values. This is an advanced use case and requires knowledge of building components in Nordcraft.

## Using theme variables

All theme variables are available throughout your project:

- Access variables in the style panel of any element
- Select from dropdowns in the relevant property fields (e.g., color picker, spacing inputs)
- Override theme variables in components using static values or dynamic formulas

This approach ensures that changes to the theme automatically propagate throughout your application, maintaining design consistency with minimal effort.

:::tip
Using Nordcraft's theme system to define your design tokens in combination with creating reusable [components](/components/overview) enables you to build out a robust design system for your project. With this approach, there is one source of truth for your design system. When a designer makes an update, the work doesn't need to be done twice.
:::
