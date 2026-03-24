---
title: Static and dynamic pages
description: Create fixed content pages or data-driven pages using URL parameters and query strings to build flexible website pages in Nordcraft.
---

# Static and dynamic pages

## Static pages

Static pages contain content added directly to the Nordcraft canvas. The content of these pages will not change until you publish updates. Static pages:

- Have fixed content created directly in the editor
- Display the same information to all users
- Use predetermined URLs without variable path segments
- Do not require API calls to render content

Static pages are the default page type in Nordcraft, and are ideal for content that doesn't need to change based on user input or external data.

## Dynamic pages

Dynamic pages display content based on data received from APIs or URL parameters. Dynamic pages use URL parameters to determine what content to display:

- **Path parameters**: Define variable segments in your URL path
- **Query parameters**: Add optional parameters after the `?` in the URL

![An annotated image of the page settings dialog, corresponding to the list items below. A checkbox is highlighted for list item 1, which enables dynamic path values, and the test value is highlighted for list item 2, which allows you to specify a value for the dynamic path parameter for testing purposes.|16/9](set-path-parameter.webp 'Path parameter'){https://editor.nordcraft.com/projects/docs_examples/branches/main/components/screenshot-page?canvas-width=800&canvas-height=800&selection=route&rightpanel=style}

### Path parameters

To create a dynamic page:

1. Set a path as a parameter by checking the `Param` checkbox in the page URL configuration panel
2. Set a test value to simulate different parameter values in the editor

For example, a blog page might use `/blog/:slug` where `:slug` is a parameter that determines which article to display.

::: info
Nordcraft prioritizes **static** pages over **dynamic** pages when multiple pages match the current URL.
:::

### Query parameters

In addition to path parameters, you can define query parameters to pass additional information in the URL, which can be useful for optional settings or filters:

- Query parameters appear after a `?` in the URL (e.g. `?size=US10`)
- Multiple parameters are separated by an `&` in the URL (e.g.`?size=US10&color=blue&material=suede`)

### Working with URL parameters

When you create URL parameters, specific actions become available in the workflow editor:

- Update path parameters to change the URL without reloading the page
- Update query parameters to modify the current state

### Uses of path and query parameters

Using path and query parameters to build up a representation of the state of a page is a great way to improve the user experience and shareability of your website URLs. For example, on an e-commerce website, you can use the URL path to indicate which product category is currently visible, and which browsing filters have been applied. A URL using path and query paremeters in this way might look like this: `https://yoursite.norcraft.com/products/shoes?color=blue&material=suede`.

In summary:

- **Path parameters**: Use for page URL identifiers that you want users to be able to navigate to consistently e.g. `/products/shoes`
- **Query parameters**: Use for optional filters or settings e.g. `?color=blue&material=suede`
