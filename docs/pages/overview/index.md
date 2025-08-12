---
title: Page fundamentals
description: Explore how pages work in Nordcraft, providing unique URLs, metadata configuration, parameter handling and component containment.
---

# Pages in Nordcraft

Pages are the foundation of applications in Nordcraft, representing distinct screens with unique URLs that users navigate to.

Pages in Nordcraft are specialized components that serve as the top-level containers for different areas of your application. They function as containers for all the content and functionality available at a specific URL. You can think of each page as being a separate document. If you're familar with other web frameworks or you have experience using HTML, pages in Nordcraft work in the same way.

## Page features

- Each page has a unique URL path
- Pages are top-level components in your application structure, not nested within other elements
- Pages do not have attributes or events
- To configure your pages, use the dedicated **Page** section in the [data panel](/the-editor/data-panel)

Pages handle a variety of functions central to web applications:

- Rendering content and UI elements
- Processing URL parameters and query strings
- Defining metadata for SEO and social sharing
- Managing internal state through variables
- Connecting to external data through APIs
- Controlling user interactions and navigation flow

An ecommerce site may contain the following pages:

- HomePage, available at `https://your-site.nordcraft.com/`
- About, available at `https://your-site.nordcraft.com/about`
- Products, available at `https://your-site.nordcraft.com/products`
- Checkout, available at `https://your-site.nordcraft.com/checkout`
- etc.

When you create a new project in Nordcraft, a page named `HomePage` is created for you automatically.

## Page structure

A page in Nordcraft can have any of the following:

- [Element tree](/the-editor/element-tree): The hierarchy of elements and components that create the page interface
- [Page configuration](/pages/page-configuration)
  - [URL configuration](/pages/page-configuration#url-structure): Path segments and query parameters that define the page URL on the web
  - [Metadata](/pages/page-configuration#metadata): Title, description, language settings, and social sharing metadata
  - [Head assets](/pages/page-configuration#head-assets): Custom scripts, styles and other resources you want to include in the page's `head` tag
- [Variables](/variables/overview): Internal state and data management
- [APIs](/connecting-data/overview): Connections to external services and data sources
- [Formulas](/formulas/overview): Calculations and data transformations
- [Workflows](/workflows/overview): Internal logic and behavior triggered by events
- [Contexts](/contexts/overview): Communication channels to provide data to child components

## Custom 404 page

If a user navigates to a URL that doesn't match any page in your application, Nordcraft shows a default 404 (page not found) page.

To create a custom 404 page:

1. Add a new page
2. Name it `404`
3. Design the page as you want it to appear when users encounter invalid URLs

::: info
Custom 404 pages are only available on paid plans. Projects in organizations on the free plan will display Nordcraft's standard 404 page.
:::
