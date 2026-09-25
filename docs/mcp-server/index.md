---
title: MCP server
description: Connect popular IDEs and AI clients to the Nordcraft MCP server to securely find, inspect, and update your Nordcraft projects.
---

# MCP server

The Model Context Protocol (MCP) is an open standard that lets AI applications connect to external tools and data. With the Nordcraft MCP server, you can use an MCP-compatible AI client to find your projects, inspect branches and project files, validate changes, and edit Nordcraft projects.

The server is hosted by Nordcraft and uses the remote [Streamable HTTP transport](https://modelcontextprotocol.io/specification/2025-06-18/basic/transports). It authenticates each user through an interactive OAuth 2.0 authorization-code flow with Proof Key for Code Exchange (PKCE).

## Connect an MCP client

You need an MCP client that supports remote Streamable HTTP servers and interactive OAuth. You also need access to the Nordcraft projects and organizations that you want the client to use.

Use the following server URL in your MCP client:

```text
https://api.nordcraft.com/mcp
```

After you add the server configuration, start the connection or use the client's authentication action. A browser window opens so you can sign in to Nordcraft, review the requested permissions, and approve access. The client stores the returned access token for future requests.

:::info
You do not need to create or copy an access token. Never add an access token, client secret, or `Authorization` header to an MCP configuration or project file.
:::

### Claude Code

Run the following command in your terminal:

```bash
claude mcp add --transport http nordcraft https://api.nordcraft.com/mcp
```

Then authenticate the server:

1. Start Claude Code.
2. Run `/mcp`.
3. Select `nordcraft` and choose **Authenticate**.
4. Sign in to Nordcraft and approve access in the browser.

### Claude Desktop

Claude Desktop uses a custom connector for remote MCP servers. Do not add the Nordcraft server to `claude_desktop_config.json`.

1. In Claude Desktop, go to **Customize > Connectors**.
2. Select **+** and then **Add custom connector**.
3. Enter `https://api.nordcraft.com/mcp` as the remote MCP server URL.
4. Add the connector, select **Connect**, and approve access in the browser.
5. Enable the connector for the conversations where you want to use it.

### VS Code with GitHub Copilot

Open the Command Palette and run **MCP: Open User Configuration**. You can also add the server to a workspace `.vscode/mcp.json` file. Add the following configuration:

```json
{
  "servers": {
    "nordcraft": {
      "type": "http",
      "url": "https://api.nordcraft.com/mcp"
    }
  }
}
```

Start or refresh the Nordcraft server from VS Code. When prompted, trust the server and complete the Nordcraft sign-in in your browser.

### Cursor

Create a global `~/.cursor/mcp.json` file, or a project-specific `.cursor/mcp.json` file, and add the following configuration:

```json
{
  "mcpServers": {
    "nordcraft": {
      "url": "https://api.nordcraft.com/mcp"
    }
  }
}
```

Reload Cursor if necessary, enable the server from **Customize**, and complete the browser authentication when Cursor first connects to it.

### Windsurf

Add the server to Windsurf's `mcp_config.json` file, normally located at `~/.codeium/windsurf/mcp_config.json`:

```json
{
  "mcpServers": {
    "nordcraft": {
      "serverUrl": "https://api.nordcraft.com/mcp"
    }
  }
}
```

Reload Cascade or restart Windsurf. When the server first connects, sign in to Nordcraft and approve access in the browser.

### Zed

In Zed, go to **Settings > AI > MCP Servers**, select **Add Server**, and then select **Add Remote Server**. You can also add the server to your `settings.json` file:

```json
{
  "context_servers": {
    "nordcraft": {
      "url": "https://api.nordcraft.com/mcp"
    }
  }
}
```

Because the configuration does not include an `Authorization` header, Zed starts the standard MCP OAuth flow and prompts you to authenticate in your browser.

## Use the server

For the best results:

1. Use `current_user` to confirm the authenticated Nordcraft account and its granted scopes.
2. Use `projects_search` to find the project short ID and organization ID.
3. Use `branches_search` to inspect existing branches.
4. Create and work on a feature branch instead of editing the read-only `main` branch.
5. Use the file tools to inspect, edit, and validate the branch, and then use `diff` to review its changes.

All project file tools require both a project short ID and a branch name. File paths are arrays of path segments, such as `["components", "Header"]`, rather than slash-separated strings.

You can also ask your AI client directly, for example:

- “Use the Nordcraft MCP server to find my projects and list the branches in my website project.”
- “Use Nordcraft to inspect the components on my latest feature branch and suggest accessibility improvements.”
- “Update the header on my feature branch, validate the files, and show me the changes before I merge them.”

If your client does not select the Nordcraft tools automatically, name the **Nordcraft** server or a specific tool in your prompt.

## Supported tools

The MCP client discovers the available tools after you authenticate. The Nordcraft MCP server currently provides the following tools.

### Account and projects

| Tool              | Purpose                                                                  | Inputs                                                                                                     |
| ----------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `current_user`    | Returns the authenticated user's ID, name, username, and granted scopes. | None                                                                                                       |
| `projects_search` | Finds Nordcraft projects that you can access.                            | Optional: `shortId`, `name`, `organizationId`, `isPrivate`, and `type` (`app` or `package`)                |
| `projects_create` | Creates a project from Nordcraft's default starter template.             | `name` (1–64 characters), `shortId` (1–40 lowercase letters or numbers), `organizationId`, and `isPrivate` |

`projects_search` returns up to 100 accessible projects, with the most recently updated projects first. The `name` filter matches part of a project name without considering case. Other project tools use the project's `short_id` value as `projectShortId`.

### Branches and changes

| Tool              | Purpose                                                                | Inputs                            |
| ----------------- | ---------------------------------------------------------------------- | --------------------------------- |
| `branches_search` | Lists branches in a project, with the newest branches first.           | `projectShortId`                  |
| `branches_create` | Creates a branch in a project.                                         | `projectShortId` and `name`       |
| `diff`            | Returns changes on a branch compared with the project's `main` branch. | `projectShortId` and `branchName` |

A new branch name must start with a lowercase letter, can contain lowercase letters, numbers, and dashes, and can be at most 32 characters long.

### Project files

| Tool             | Purpose                                                                          | Inputs                                                                      |
| ---------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `files_glob`     | Lists full paths for files that match a glob pattern.                            | `projectShortId`, `branchName`, and optional `pattern` (defaults to `**/*`) |
| `files_read`     | Reads a project file and returns it in Nordcraft's NC format when applicable.    | `projectShortId`, `branchName`, `path`, and optional `patterns`             |
| `files_edit`     | Applies an NC Diff patch to one new or existing file and saves it to the branch. | `projectShortId`, `branchName`, and `patch`                                 |
| `files_validate` | Runs validation rules against one or more project files.                         | `projectShortId`, `branchName`, and `paths`                                 |

Glob matching is case-sensitive. For `files_read`, `path` is an array of segments and `patterns` can filter returned sections. For `files_validate`, `paths` is an array of path arrays, such as `[["components", "Header"], ["formulas", "total"]]`, and each path must contain at least two segments.

The `files_edit` patch must contain a complete NC Diff body inside a type-specific semantic XML tag. The opening tag includes the file `path` and a one-line commit `message`.

### Nordcraft skills

These tools return reference instructions that help an AI client work correctly with Nordcraft. They do not directly change a project and do not take project inputs.

| Tool                    | Reference                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `skill-action`          | Custom action JavaScript handlers and workflow statements                            |
| `skill-formula`         | Project formulas and JavaScript-based calculation handlers                           |
| `skill-component`       | Components and pages, including nodes, workflows, APIs, lifecycles, and patch syntax |
| `skill-theme`           | Theme files, including metadata, fonts, custom properties, and variants              |
| `skill-stdlib-formulas` | Built-in `@toddle/*` formulas                                                        |
| `skill-stdlib-actions`  | Built-in `@toddle/*` actions                                                         |

## Security and permissions

The MCP server acts with the access of the Nordcraft user who approves the connection. Your Nordcraft account permissions still determine which existing projects and organizations you can use.

:::warning
Some tools can create projects and branches or change project files. Work on a feature branch, review every tool call, validate edited files, and inspect the branch diff before merging changes.
:::

Follow these guidelines when using the server:

- Review the requested OAuth permissions and only approve the access you need.
- Review write operations before allowing your AI client to run them automatically.
- Do not commit access tokens, client secrets, or `Authorization` headers to source control.
- Do not store credentials in Nordcraft project files.
- Disconnect the server from your MCP client when you no longer need the access.
