---
title: Static and dynamic pages
description: Create fixed content pages or data-driven pages using URL parameters and query strings to build flexible applications in Nordcraft.
---

# Static and dynamic pages

## Static pages

Static pages contain content added directly to the Nordcraft canvas that doesn't change unless you publish updates. They:

- Have fixed content created directly in the editor
- Display the same information to all users
- Use predetermined URLs without variable path segments
- Don't require API calls to render content

Static pages are the default page type in Nordcraft, and are ideal for content that doesn't need to change based on user input or external data.

## Dynamic pages

Dynamic pages display content based on data received from APIs or URL parameters. They use URL parameters to determine what content to display:

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

- Query parameters appear after a `?` in the URL (e.g. `?category=shirts`)
- Multiple parameters are separated by an `&` in the URL (e.g.`?category=shirtsue&color=blue`)

### Working with URL parameters

When you create URL parameters, specific actions become available in the workflow editor:

- Update path parameters to change the URL without reloading the page
- Update query parameters to modify the current state

## When to use URL parameters

### Path vs. query parameters

- **Path parameters**: Use for essential page identification that affects navigation history
- **Query parameters**: Use for optional filters or settings that don't represent distinct navigation states

### URL parameters vs. variables

- **URL parameters**: Use when data should persist through page reloads and be shareable via links, such as a filtered search on an ecommerce site
- **Variables**: Use for temporary state or sensitive information not appropriate for URLs

Examples of data appropriate for **URL parameters**:

- Active tab selection
- Selected item in a list
- Visibility state of important UI elements

Examples better suited for **variables**:

- Form input values
- Confirmation dialog states
