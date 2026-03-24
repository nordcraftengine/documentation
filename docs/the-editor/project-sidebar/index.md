---
title: Project sidebar
description: Use the project sidebar to access pages, components, APIs, project formulas, services, actions, media, themes and project-wide configuration settings.
---

# Project sidebar

The project sidebar provides an overview of your project files and resources, any issues detected in your project, and any changes made in the current branch you are working in.

![The project sidebar is visible, showing three existing pages, and collapsed sections for components, services, actions, formulas, media, themes and settings. The image is annotated corresponding to the list items below.|16/9](project-sidebar.webp 'Project sidebar')

Use the icons at the left of the screen to access the following:

1. **Files**: View all files, components, services, actions, formulas, media, themes and settings in your project
2. **View and install packages**: Browse, search for, and install Nordcraft packages
3. **Issues**: View issues found in your project and get advice on how to fix them (an orange dot is visible when issues are detected)
4. **Version control**: View any changes made in the current branch of your project, see the branch history, and switch between branches

::: tip
Open the project files view using the keyboard shortcut [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd]. Close the file view by pressing [kbd]Escape[kbd].
:::

## Structure

### Search

With the files icon selected, search files by typing in the search field at the top of the sidebar.

### Recent

Displays files you have recently accessed for quick navigation between components, pages and other files.

### Content sections

Each section can be expanded or collapsed and includes a [kbd]+[kbd] button to create new items (except for themes and settings):

- [Pages](/pages/overview): Pages in your project
- [Components](/components/overview): Reusable components in your project
- [Services](/connecting-data/services): API connections to external services with an OpenAPI specification
- [Actions](/actions/overview): Global actions (custom JavaScript code) in your project
- [Formulas](/formulas/project-formulas): Project formulas that can be accessed from any page or component in your project
- [Media](/media/overview) Image files uploaded for use in your project
- Fonts: All fonts currently installed in your project
- [Themes](/styling/theme): Design tokens including colors, spacing, and typography
- **Settings**: Project configurations including favicon, robots.txt, sitemap, app manifest and service worker

## Project settings

At the bottom of the files view of the project sidebar, you can configure the following settings for your project:

- **Favicon**: Upload a [favicon](https://developer.mozilla.org/en-US/docs/Glossary/Favicon) for your project - available at `/favicon.ico`
- **Robots.txt**: Target a custom [robots.txt](https://developer.mozilla.org/en-US/docs/Glossary/Robots.txt) document (with a URL) - available at `/robots.txt`
- **Sitemap.xml**: Target a custom [sitemap.xml](https://en.wikipedia.org/wiki/Sitemaps) document (with a URL) - available at `/sitemap.xml`
- **App Manifest**: Target a custom [manifest](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest) JSON file (with a URL) - available at `/manifest.json`
- **Service Worker**: Target a javascript file url for a script that registers a [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers). The script will be available on `/serviceWorker.js`. To serve the actual service worker, you need to create a [proxy](/pages/proxies) to the URL where the service worker script is hosted. The service worker registration script could also be used to include a custom script on all pages of your project. See a reference implementation of using a service worker in [this example project](https://editor.nordcraft.com/projects/service_worker_example/branches/main/routes/my-service-worker?canvas-width=800&canvas-height=800&rightpanel=style).

::: info
Project settings are only available on paid plans.
:::
