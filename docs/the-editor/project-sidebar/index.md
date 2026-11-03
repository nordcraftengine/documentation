---
title: Project sidebar
description: Use the project sidebar to access pages, components, APIs, project formulas, services, actions, media, themes and project-wide configuration settings.
---

# Project sidebar

The project sidebar provides an overview of your project files and resources, any issues detected in your project.

![The project sidebar showing the activity bar with buttons for Pages, Components, Services, Media, Formulas, Actions, Themes, Fonts, Config, Packages, Issues, and History.|16/9](project-sidebar.webp 'Project sidebar')

The left sidebar provides direct access to all of the following:

- **Pages**: View, search, and create application [pages](/pages/overview) and routes (including redirects and proxies)
- **Components**: Access and manage all reusable [components](/components/overview) in your project
- **Services**: Configure API connections to external [services](/connecting-data/services)
- **Media**: Browse and upload image files in your [media](/media/overview) library
- **Formulas**: Create and manage project-wide [formulas](/formulas/project-formulas)
- **Actions**: Write and edit custom JavaScript [actions](/actions/overview)
- **Themes**: Open the [theme](/styling/themes) editor to manage design tokens, colors, and typography
- **Fonts**: Install and manage web fonts across your project
- **Config**: Configure project settings including favicon, robots.txt, sitemap, app manifest, and service worker
- **Packages**: Browse, search for, and install [packages](/packages/overview)
- **Issues**: View project diagnostics and get guidance on fixing errors or warnings (badged with an alert dot when issues exist)
- **History**: Inspect branch commit history

::: tip
You can also open files and run actions without using the sidebar by opening the [command palette](/the-editor/command-palette). Press [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd] to search files, or [kbd]Cmd/Ctrl[kbd] + [kbd]Shift[kbd] + [kbd]K[kbd] to run quick actions.
:::

## Navigating the sidebar

Clicking any file category button (such as **Pages**, **Components**, or **Actions**) opens a dedicated drawer:

- **Search**: Filter items in the active list using the search input at the top of the panel.
- **Create new items**: Click the [kbd]+[kbd] button at the top of the list to create a new page, component, service, formula, or action.
- **Context menu**: Right-click any item in the list to access file actions such as rename, duplicate, copy, or delete.

## Project settings

Click the [kbd]Config[kbd] button in the left sidebar to configure the following settings for your project:

- **Favicon**: Upload a [favicon](https://developer.mozilla.org/en-US/docs/Glossary/Favicon) for your project - available at `/favicon.ico`
- **Robots.txt**: Target a custom [robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/Robots.txt) document (with a URL) - available at `/robots.txt`
- **Sitemap.xml**: Target a custom [sitemap.xml](https://en.wikipedia.org/wiki/Sitemaps) document (with a URL) - available at `/sitemap.xml`
- **App Manifest**: Target a custom [manifest](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest) JSON file (with a URL) - available at `/manifest.json`
- **Service Worker**: Target a javascript file url for a script that registers a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers). The script will be available on `/serviceWorker.js`. To serve the actual service worker, you need to create a [proxy](/pages/proxies) to the URL where the service worker script is hosted. The service worker registration script could also be used to include a custom script on all pages of your project. See a reference implementation of using a service worker in [this example project](https://editor.nordcraft.com/projects/service_worker_example/branches/main/routes/my-service-worker?canvas-width=800&canvas-height=800&rightpanel=style).

::: info
Project settings are only available on upgraded projects.
:::
