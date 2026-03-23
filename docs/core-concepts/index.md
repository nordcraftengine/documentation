---
title: Nordcraft core concepts
description: Explore Nordcraft’s core principles: component architecture, reactive data flow, and visual development with code.
---

# Nordcaft core concepts

Nordcraft is a website builder combined with a powerful AI agent. When building with Nordcraft, you get complete creative control to craft user experiences, and the speed of AI to generate the rest.

Nordcraft is built around several fundamental concepts. Understanding these core concepts will help you work more effectively with Nordcraft before you begin your first project.

## Visual development built on web standards

Nordcraft is a visual website builder built on modern web standards of HTML, CSS and JavaScript.

- If you already know HTML and CSS, you know how to build websites in Nordcraft
- Design and build visually on a responsive canvas that updates in real-time
- Add custom code when needed for specialized functionality

Nordcraft's website builder bridges the gap between visual design tools and coding environments, eliminating traditional handoffs between designers and developers, and removing the time-consuming setup processes of traditional development environments.

Explore [the Nordcraft editor](/the-editor/overview) to see how this works in practice.

## Component-based architecture

In Nordcraft you can take advantage of a [component-based architecture](/components/overview):

- **Components** are reusable, self-contained pieces of interface and functionality
- Each component has its own structure, [styling](/styling/styles-and-layout) and behavior
- Components can be [composed together](/components/compositions) to create more complex interfaces
- Components maintain encapsulation of their internal state and logic

A component-based approach promotes reusability, project maintainability and team collaboration. Learn how to [create your own components](/components/create-a-component) to build a tidy, modular project.

## Projects: websites and packages

In Nordcraft you can create [two types of project](/get-started/create-a-project):

- **Websites**: complete websites with pages and functionality
- **Packages**: collections of reusable components and functions

You can create and publish [packages](/packages/overview) to share across projects, making them ideal for common functionality across different websites. Learn more about [creating and launching packages](/packages/creating-and-launching) to share your work.

## Branches and version control

Nordcraft includes a Git-like [version control system](/get-started/branches-and-publishing):

- The `main` branch represents the live version of your project
- Create new branches for developing new features or fixes
- [Preview changes](/get-started/branches-and-publishing#preview-a-branch) on a live URL before publishing
- [Publish branches to the main branch](/get-started/branches-and-publishing#publish-changes) when work is complete

This workflow enables flexible collaboration and helps maintain the stability of your live websites. For best practices, check out our guide on [effective branching](/good-practices/branching) strategies.

## Pages and navigation

[Pages](/pages/overview) are the foundation of websites in Nordcraft:

- Each page has a unique [URL path](/pages/page-configuration#url-structure)
- Use page [parameters](/pages/static-and-dynamic#dynamic-pages) to power dynamic content
- Your pages can contain [components](/building-blocks/components) and [elements](/building-blocks/elements)
- Configure [SEO metadata](/pages/page-configuration#metadata) including Open Graph image metadata for each page

Learn how to [create pages](/pages/create-a-page) and set up their configuration.

## Data flow and reactivity

Nordcraft uses a reactive data model built on signals:

- Store state within components and pages using [variables](/variables/overview)
- Transform data using [formulas](/formulas/overview)
- Use [events and workflows](/workflows/overview) to build interactivity
- Use [contexts](/contexts/overview) to share data between components
- Each time any data changes, Nordcraft updates your website's user interface automatically

Learn about [working with variables](/variables/working-with-variables) and [creating formulas](/formulas/working-with-formulas) to implement dynamic behavior.

## Server and client rendering

Nordcraft supports both server-side rendering (SSR) and client-side rendering (CSR):

- SSR improves initial page load speed and is essential for search engine optimization (SEO)
- CSR enables rich interactivity after the initial page load
- Nordcraft intelligently handles the transition between these modes

When [working with APIs](/connecting-data/working-with-apis), you can [configure which requests are processed during SSR](/connecting-data/advanced-api-features#server-side-rendering-ssr) or whether they are processed on the client after the initial page has loaded.

## API integration

You can connect any external data source by connecting an [API](/connecting-data/overview):

- [Configure endpoints](/connecting-data/working-with-apis) to connect to any back end
- Handle [authentication](/connecting-data/authentication) securely
- Transform and use [response data](/connecting-data/call-an-api#accessing-api-data) anywhere on your websites
- Set up real-time data transfer with [streaming connections](/connecting-data/streaming)
- Connect to specialized back-end providers through [services](/connecting-data/services)

:::tip
Ready to start building? Head to the [Get started](/get-started/overview) section to learn how to create your first project.
:::
