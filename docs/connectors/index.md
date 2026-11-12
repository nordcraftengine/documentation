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

- **Figma**: Let the AI inspect frames, components, typography, colors, and layout structures directly from your Figma files. The AI can translate your Figma designs into clean Nordcraft elements and components without requiring you to manually recreate styles from scratch. Connecting Figma requires a Personal Access Token and your Figma Team ID. Note that the Figma connector has very limited functionality if you are not on a paid Figma plan.
- **Miro and Excalidraw**: Brainstorm wireframes, user flows, or sitemaps on a virtual whiteboard. The AI can read your diagrams and help scaffold pages, navigation menus, and layouts that match your planned user journey.

### Connect to CMS and content providers

- **Headless CMS platforms (Sanity, Contentful, DatoCMS, Notion, Umbraco, Webflow)**: The AI can inspect your content models, field names, and existing records. This makes it effortless to build pages, repeat lists, and component layouts that match your exact content structure without guessing schema names.

### Connect to databases and backends

- **Backend platforms (Supabase, Xano)**: Let the AI examine your database tables, columns, and relationships. When you want to fetch and display data in Nordcraft, the AI can help configure APIs, formulas, and data bindings accurately.

### Generate media and assets

- **FLORA**: Connect your FLORA account so the AI can generate images, videos, and creative assets with 50+ AI models directly for your Nordcraft pages and components.

### Sync project context and tasks

- **Issue trackers and repositories (Linear, GitHub)**: Give the AI access to task descriptions, user stories, or code repositories so it understands your project requirements and structure as you build.

## Standard vs. custom connectors

In Nordcraft, connectors are divided into **standard connectors** (services pre-configured and listed in Nordcraft) and **custom connectors** (connecting to any external MCP server not on the list).

### Standard connectors

Standard connectors are pre-configured integrations built directly into Nordcraft. Depending on the service, authentication is handled in one of four ways:

- **OAuth with a known server URL**: Simply click [kbd]Connect[kbd] and sign in to your account in your browser. Nordcraft manages the server endpoint and connection securely (e.g., Contentful, DatoCMS, FLORA, Linear, Miro, Notion, Sanity, Supabase, Webflow).
- **OAuth with a custom server URL**: The service uses browser login (OAuth), but you provide your specific instance or server URL before connecting (e.g., Umbraco).
- **Token with a known server URL**: Nordcraft connects to the known service endpoint, but you provide an access token from your account, along with any required details (e.g., Figma, GitHub, Excalidraw).
- **Token with a custom server URL**: You provide both your workspace/instance URL and your personal API token (e.g., Xano).

Supported standard connectors include:

- **Contentful**: Access content models and entries.
- **DatoCMS**: Explore your DatoCMS schema and records.
- **Excalidraw**: Read drawings, wireframes, and whiteboard sketches using an access token.
- **Figma**: Inspect frames, components, typography, colors, and layout structures from your Figma files. Requires a Personal Access Token (access token) created in your Figma account (**Settings > Security**) and your **Figma Team ID**.
- **FLORA**: Generate images, videos, and creative assets with 50+ AI models.
- **GitHub**: Read code, issues, and repository structure using a Personal Access Token from your [GitHub settings](https://github.com/settings/personal-access-tokens).
- **Linear**: Read issues, cycles, and project tasks.
- **Miro**: Read boards, shapes, user flows, and sticky notes.
- **Notion**: Read pages and databases from your Notion workspace.
- **Sanity**: Inspect datasets, document types, and fields.
- **Supabase**: Interact with your Supabase database and project structure.
- **Umbraco**: Connect your Umbraco CMS using your Umbraco MCP server URL and an access token.
- **Webflow**: Access Webflow CMS items and site structure.
- **Xano**: Connect your Xano workspace using your Xano server URL and API token.

::: warning
The Figma connector has very limited functionality if you are not on a paid Figma plan, as Figma limits access to team files and inspection APIs on free plans.
:::

### Custom connectors

If you want to connect a service that is not in Nordcraft's list of standard connectors, you can add a **Custom connector**. This allows you to connect any external, self-hosted, or third-party MCP-compliant server.

When adding a custom connector, provide the **Server URL**:

- **OAuth authentication**: If your custom MCP server supports OAuth, simply enter the **Server URL** and leave the token field empty. When you click [kbd]Connect[kbd], Nordcraft will open a browser window for you to sign in.
- **Token authentication**: If the server requires an access token, enter the **Server URL** and paste your pre-generated token. You can also supply optional OAuth endpoints (Auth URL, Token URL, Client ID) if your server requires custom client parameters.

## Add a connector

To add a connector to your project:

1. Open the AI Assistant in the Nordcraft editor by clicking [kbd]Ask AI[kbd] in the bottom bar, or by pressing [kbd]Cmd/Ctrl[kbd] + [kbd]I[kbd].
2. Click the menu button ([kbd]☰[kbd]) in the top left of the AI Assistant header to open the AI panel menu.
3. In the **Connectors** section at the top, click the [kbd]+[kbd] (Add connector) button.
4. Select a service from the list of standard connectors, or select **Custom** to connect an unlisted MCP server.
5. Configure the connector:
   - **For standard OAuth connectors**: Enter a name (or keep the default name) and click [kbd]Connect[kbd]. A browser window will open asking you to sign in and authorize access. If prompted (such as for Umbraco), enter your server URL first.
   - **For standard token-based connectors**: Enter a name, paste your access token, and fill in any required extra fields (such as your **Figma Team ID** for Figma, or your workspace URL for Xano). Then click [kbd]Connect[kbd].
   - **For custom connectors**: Enter a name and your **Server URL**. If your server uses OAuth, leave the token field empty and click [kbd]Connect[kbd]. If it requires a token, enter your token (and optional OAuth client settings if needed) and click [kbd]Connect[kbd].
6. Once connected, your new connector will appear in the Connectors list with a green status indicator.

::: info
Remember that connectors are saved per project. If you create a new project and want to use the same connector, simply add it to that project following the same steps.
:::

## Manage existing connectors

You can manage all connectors in your project from the AI panel menu:

- **Status indicator**:
  - **Green**: The connector is connected and ready to use.
  - **Orange**: The connector is disconnected or needs re-authentication.
- **Connector options**:
  - **Connect**: If the connector is disconnected, click to reconnect it.
  - **Disconnect**: If the connector is connected, click to disconnect it.
  - **Delete**: Permanently remove the connector from the project. This immediately removes the connector and clears the corresponding HTTP-only cookie from your browser.

## Using connectors with the AI

Once a connector is added to your project, you do not need to do any extra setup. The AI Assistant automatically discovers the available tools and data from all connected services.

When chatting in **Ask**, **Plan**, or **Build** mode, you can prompt the AI to use your connected tools:

- _"Inspect my Figma file and create a hero section component that matches the design."_
- _"Look at my Supabase schema and show me how to structure an API to load products."_
- _"Check our Sanity dataset structure and build a blog post card component."_
- _"Review the user flow wireframe in Miro and generate the routes for our app."_

While the AI works, you will see interactive tool chips in the chat thread showing when the AI discovers tools or fetches data from your connectors.
