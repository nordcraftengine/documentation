---
title: Connectors
description: Connect Nordcraft's AI Assistant to external tools like Figma, Miro, CMS platforms, and databases using project connectors.
---

# Connectors

Connectors allow Nordcraft's built-in AI Assistant to communicate directly with your external tools and services. Instead of manually copying and pasting design tokens, wireframe ideas, or database schemas into chat prompts, you can connect your favorite platforms to give the AI direct access to the context it needs.

Under the hood, connectors use the open-source [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) standard, but in Nordcraft we call them **connectors**.

::: info
Connectors are **scoped per project**. When you add a connector, it is connected only to the current Nordcraft project. This keeps your project data organized and private to the project you are working on.

Your credentials and access tokens are **never stored with Nordcraft**—they live securely in HTTP-only cookies in your browser.
:::

## Advantages and use cases

Connectors turn the AI Assistant from a general helper into a tailored collaborator that understands your designs, content, and data.

### Transfer designs and wireframes into Nordcraft

- **Figma**: Let the AI inspect frames, components, typography, colors, and layout structures directly from your Figma files. The AI can translate your Figma designs into clean Nordcraft elements and components without requiring you to manually recreate styles from scratch. Note that the Figma connector has very limited functionality if you are not on a paid Figma plan.
- **Miro and Excalidraw**: Brainstorm wireframes, user flows, or sitemaps on a virtual whiteboard. The AI can read your diagrams and help scaffold pages, navigation menus, and layouts that match your planned user journey.

### Connect to CMS and content providers

- **Headless CMS platforms (Sanity, Contentful, DatoCMS, Notion, Webflow)**: The AI can inspect your content models, field names, and existing records. This makes it effortless to build pages, repeat lists, and component layouts that match your exact content structure without guessing schema names.

### Connect to databases and backends

- **Backend platforms (Supabase, Xano)**: Let the AI examine your database tables, columns, and relationships. When you want to fetch and display data in Nordcraft, the AI can help configure APIs, formulas, and data bindings accurately.

### Sync project context and tasks

- **Issue trackers and repositories (Linear, GitHub)**: Give the AI access to task descriptions, user stories, or code repositories so it understands your project requirements as you build.

## Standard vs. custom connectors

Nordcraft supports two types of connectors depending on how the external service handles authentication:

| Connector type | Authentication method                             | When to use                                                                                                     |
| -------------- | ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Standard**   | One-click OAuth login                             | Services that support direct browser login. You do not need to generate or paste any access tokens.             |
| **Custom**     | Pre-generated token / Personal Access Token (PAT) | Services that require personal tokens, extra configuration (like team IDs), or private self-hosted MCP servers. |

### Standard connectors

Standard connectors provide a seamless setup. You simply select the provider, click [kbd]Connect[kbd], and log in through your browser to approve access. Nordcraft handles the connection securely behind the scenes.

Supported standard connectors include:

- **Supabase**: Interact with your Supabase database and project structure.
- **Contentful**: Access content models and entries.
- **DatoCMS**: Explore your DatoCMS schema and records.
- **Notion**: Read pages and databases from your Notion workspace.
- **Sanity**: Inspect datasets, document types, and fields.
- **Miro**: Read boards, shapes, and sticky notes.
- **Webflow**: Access Webflow CMS items and site structure.
- **Linear**: Read issues, cycles, and project tasks.
- **Lovable**: Sync features and ideas from Lovable projects.

### Custom connectors

Custom connectors are used when a service requires a Personal Access Token (PAT) or extra information, or when you want to connect your own self-hosted MCP server:

- **Figma**: Requires a Personal Access Token created in your Figma account (**Settings > Security**) and your **Figma Team ID**.
  ::: warning
  The Figma connector has very limited functionality if you are not on a paid Figma plan, as Figma limits access to team files and inspection APIs on free plans.
  :::
- **GitHub**: Requires a Personal Access Token created in your [GitHub settings](https://github.com/settings/personal-access-tokens) to let the AI explore your repositories.
- **Xano**: Connect your Xano workspace using your Xano API token.
- **Excalidraw**: Connect to the Excalidraw MCP service using an access token.
- **Custom MCP server**: Connect any MCP-compliant server by providing the server's URL and authentication details (token, or optional OAuth URLs and client ID).

## Add a connector

To add a connector to your project:

1. Open the AI Assistant in the Nordcraft editor by clicking [kbd]Ask AI[kbd] in the bottom bar, or by pressing [kbd]Cmd/Ctrl[kbd] + [kbd]I[kbd].
2. Click the menu button ([kbd]☰[kbd]) in the top left of the AI Assistant header to open the AI panel menu.
3. In the **Connectors** section at the top, click the [kbd]+[kbd] (Add connector) button.
4. Select the desired service from the **MCP service** dropdown.
5. Configure the connector depending on the service type:
   - **For Standard connectors**: Enter a name for the connector (or keep the default name) and click [kbd]Connect[kbd]. A browser window will open asking you to sign in and authorize Nordcraft.
   - **For Custom connectors**: Enter a name, verify or enter the **Server URL**, paste your **Token** (Personal Access Token), and fill in any required extra fields (such as the **Figma Team ID** for Figma). Then click [kbd]Connect[kbd].
6. Once connected, your new connector will appear in the Connectors list with a green status indicator.

::: info
Remember that connectors are saved per project. If you create a new project and want to use the same connector, simply add it to that project following the same steps.
:::

## Manage existing connectors

You can manage all connectors in your project from the AI panel menu:

- **Status indicator**:
  - **Green**: The connector is connected and ready to use.
  - **Orange**: The connector is disconnected or needs re-authentication.
- **Connector options**: Click the three dots ([kbd]⋮[kbd]) next to any connector to:
  - **Connect**: Re-authenticate or reconnect an inactive connector.
  - **Disconnect**: Temporarily disconnect the connector without deleting it.
  - **Delete**: Permanently remove the connector from the project. This immediately removes the connector and clears the corresponding HTTP-only cookie from your browser.

## Using connectors with the AI

Once a connector is added to your project, you do not need to do any extra setup. The AI Assistant automatically discovers the available tools and data from all connected services.

When chatting in either **Ask mode** or **Build mode**, you can prompt the AI to use your connected tools:

- _"Inspect my Figma file and create a hero section component that matches the design."_
- _"Look at my Supabase schema and show me how to structure an API to load products."_
- _"Check our Sanity dataset structure and build a blog post card component."_
- _"Review the user flow wireframe in Miro and generate the routes for our app."_

While the AI works, you will see interactive tool chips in the chat thread showing when the AI discovers tools or fetches data from your connectors.
