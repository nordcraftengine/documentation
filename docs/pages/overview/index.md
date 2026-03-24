---
title: Page fundamentals
description: Explore how pages work in Nordcraft, learn how to configure page metadata, URL query parameters, and more.
---

# Pages in Nordcraft

Pages in Nordcraft are HTML documents. Each page on your website has a unique URL that users can navigate to in a browser. For example:

- your home page will be accessed at `https://your-site.nordcraft.com/`
- your about page may be accessed at `https://your-site.nordcraft.com/about`
- and your contact page may be accessed at `https://your-site.nordcraft.com/contact`.

:::info
When you create a new project in Nordcraft, a page named `HomePage` is created for you automatically. You can rename the page from the project sidebar if you need to.
:::

## Page structure

A page in Nordcraft can have any of the following:

- [Element tree](/the-editor/element-tree): HTML elements and components
- [Page configuration](/pages/page-configuration)
  - [URL configuration](/pages/page-configuration#url-structure): Path segments and query parameters that define the full page URL in a browser
  - [Metadata](/pages/page-configuration#metadata): Title, description, language settings, and social sharing metadata
  - [Head assets](/pages/page-configuration#head-assets): Custom scripts, styles and other resources you want to include in the page's HTML `head` tag
- [Variables](/variables/overview): State and data management
- [APIs](/connecting-data/overview): Connections to external services and back-end data sources
- [Formulas](/formulas/overview): Calculations and data transformations
- [Workflows](/workflows/overview): Internal logic and behavior triggered by events
- [Contexts](/contexts/overview): Communication channels to provide data to child components

::: tip
To learn more about pages in Nordcraft, check out the following lesson from the [Nordcraft Fundamentals](https://nordcraft.com/learn/fundamentals) video course.
:::

@@@ youtube
videoId: bFz4tk0YTDo
title: Pages in Nordcraft
@@@

## Custom 404 page

If a user navigates to a URL that doesn't match any page in your project, Nordcraft shows a default 404 (page not found) page.

To create a custom 404 page:

1. Add a new page
2. Name it `404`
3. Design the page as you want it to appear when users encounter invalid URLs

::: info
Custom 404 pages are only available on paid plans. Projects in organizations on the free plan will display Nordcraft's standard 404 page.
:::
