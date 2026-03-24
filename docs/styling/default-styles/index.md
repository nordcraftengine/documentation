---
title: Default styles
description: Understand Nordcraft's reset stylesheet and default flexbox layout that ensure consistent rendering across browsers with minimal configuration.
---

# Default styles

Browsers apply their own default CSS styles to HTML elements. These are also known as **user agent styles**, and these can vary significantly between browsers. This can cause inconsistencies in how websites are rendered in different browsers.

In websites built with Nordcraft, a **CSS reset stylesheet** is applied to all elements by default. This consists of a number of different CSS rules to "reset" the user agent styles, which provides you with a consistent starting point for CSS for your websites across different browsers and devices.

The CSS reset stylesheet includes the following key CSS rules:

- Most elements are set to `display: flex` and `flex-direction: column`
- Text elements such as headings, labels and paragraphs are set to `display: inline-block`
- All elements are set to `padding: 0` and `margin: 0`
- All list elements are set to `list-style: none`

## Custom styles

Any custom styles you apply to elements will always override the CSS reset styles. However, when working with external web components that include their own styles, you may need to opt out of Nordcraft’s default reset stylesheet for compatibility.

To exclude elements from the reset styles, add the HTML attribute `data-unset-toddle-styles` to an element to ignore the reset stylesheet rules for that element.
