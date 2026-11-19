---
title: Self-hosting
description: Learn how to self-host your Nordcraft website on your own server, Docker, or Cloudflare Workers using the open-source Nordcraft backend.
---

# Self-hosting

By default, Nordcraft hosts your websites on Nordcraft's infrastructure. Because Nordcraft is open source, you can also export your project and **self-host** it on your own infrastructure using the open-source backend package in the [Nordcraft GitHub repository](https://github.com/nordcraftengine/nordcraft/tree/main/packages/backend).

::: info
The Nordcraft self-hosting backend package is still under active development. Check the [Nordcraft repository on GitHub](https://github.com/nordcraftengine/nordcraft/tree/main/packages/backend) for the latest updates and improvements.
:::

## What is included

When you self-host a Nordcraft website with the `@nordcraft/backend` package, your site runs with the core features you get on Nordcraft's hosting:

- **Server-side rendering (SSR)**: Pages are rendered on the server for fast initial load times and search engine optimization (SEO), then hydrated in the browser for interactivity.
- **Custom formulas and actions**: Your project's custom formulas and actions work during both server-side rendering and in the browser.
- **Redirects and proxies**: Handles the [redirects](/pages/redirects) and [proxies](/pages/proxies) configured in your project.
- **API requests and cookies**: Proxies client API requests and supports [HTTP-only cookies](/connecting-data/authentication) for authentication.
- **Fonts and site files**: Serves Google Fonts, page stylesheets, exported [custom elements](/components/export-a-component), `/sitemap.xml`, `/robots.txt`, `/manifest.json`, and `/favicon.ico` based on your project configuration.

## Before you start

To self-host a Nordcraft website, you need:

- A Nordcraft website project that you want to host
- [Bun](https://bun.sh/) installed on your computer to install dependencies and prepare your project
- A hosting provider if you plan to publish online, such as [Cloudflare Workers](https://workers.cloudflare.com/), [Docker](https://www.docker.com/), or a server running Bun or Node.js

## Export and set up your project

Follow these steps to export your website from Nordcraft and add it to the backend package:

1. Open your project in Nordcraft and go to the [Project details](/get-started/project-details#branches) page.
2. Find the branch you want to host (usually `main`), open its actions menu, and select **Download branch** to save your project as a JSON file.
3. Clone the [Nordcraft repository](https://github.com/nordcraftengine/nordcraft) from GitHub, install the dependencies, and build the workspace packages from the root folder:

```bash
git clone https://github.com/nordcraftengine/nordcraft.git
cd nordcraft
bun install
bun run build
```

4. Move the JSON file you downloaded from Nordcraft into `packages/backend/__project__/project.json`, replacing the example `project.json` file.

::: tip
Your self-hosted site serves the snapshot you exported in `project.json`. Whenever you publish new changes in Nordcraft, download the updated branch, replace `project.json`, and redeploy.
:::

## Run locally

Before deploying to a live server, you can test your self-hosted website locally. Navigate to the backend folder and start the development server:

```bash
cd packages/backend
bun run dev
```

This prepares your project's pages and static assets and starts a local server so you can preview your site in your browser.

If you want to test the compiled production server locally, you can also run it directly with Bun (`bun run bunrun`) or Node.js (`bun run noderun`).

## Deploy your website

Once your project is set up in `packages/backend`, you can deploy it to Cloudflare Workers or package it with Docker to run on any server.

### Deploy to Cloudflare Workers

The backend package comes pre-configured for [Cloudflare Workers](https://workers.cloudflare.com/) in `packages/backend/wrangler.toml`.

1. Provide your Cloudflare account ID by setting the `CLOUDFLARE_ACCOUNT_ID` environment variable or adding it to `packages/backend/wrangler.toml`.
2. Deploy your website from the `packages/backend` folder:

```bash
bun run deploy
```

This command prepares your project's static assets, bundles the application, and publishes it to Cloudflare Workers.

### Deploy with Docker

If you want to host your website on your own server or any container platform, use the included `Dockerfile` to build and run a lightweight container.

From the `packages/backend` folder, run:

```bash
bun run docker:build
bun run docker:run
```

By default, the container serves your website on port `3000`.

## Best practices

Keep the following in mind when running a self-hosted Nordcraft website:

- **Use HTTPS in production**: Serve your public website over HTTPS so features like [HTTP-only cookies](/connecting-data/authentication) work properly in browsers.
- **Keep secrets out of your project**: Never store private API keys or sensitive credentials in your Nordcraft project. Read the [Security guide](/guides/security) to learn how to handle sensitive data safely.
- **Keep your export in sync**: Self-hosted websites do not automatically update when you edit your project in Nordcraft. Re-export your branch and redeploy whenever you want changes to go live.
