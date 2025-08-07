---
title: Default styles
description: Understand Nordcraft's reset stylesheet and default flexbox layout that ensure consistent rendering across browsers with minimal configuration.
---

# Default styles

In your Nordcraft projects, a **reset stylesheet** is applied to all elements by default, to ensure consistent rendering across different browsers.

Browsers have their own default styles, also known as user agent styles, that can vary significantly. This can cause inconsistencies in how web pages are rendered. The Nordcraft reset stylesheet creates a clean baseline on which to build upon, ensuring your project looks consistent across all browsers.

## Key benefits

- **Cross-Browser consistency**: Elements like headings, margins, paddings and lists appear the same across all browsers
- **Simplified development**: Browser-specific quirks are eliminated, making styling more predictable
- **Cleaner base for custom styles**: Allows developers to build designs without interference from browser defaults
- **Improved maintainability**: Reduces the need for browser-specific overrides, leading to cleaner code

## Flexbox by default

All elements in Nordcraft use `display: flex` by default, offering several advantages:

- Simplified alignment of elements and distribution of space
- Easier implementation of responsive layouts
- Creation of complex, dynamic designs with less code

## Custom styles

Any custom styles you apply to elements will always override the reset styles. However, when working with external web components that include their own styles, you may need to opt out of Nordcraft’s default reset stylesheet for compatibility.

::: tip
**Exclude elements from reset styles**: Add the attribute `data-unset-toddle-styles` to an element to ignore the reset stylesheet rules for that element.
:::
