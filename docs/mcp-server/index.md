---
title: MCP server
description: Connect popular AI tools to Nordcraft so they can help you find projects, review changes, validate files, and make updates.
---

# MCP server

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that connects AI assistants and coding tools to other services. With the Nordcraft MCP server, you can ask your AI tool to find your projects, explore branches, review or change files, and check your work.

The connection is hosted by Nordcraft. When you set it up, you sign in to Nordcraft in your browser and choose which permissions to approve. You never need to copy your Nordcraft password or another secret into your AI tool.

## Connect your AI tool

You need an AI tool that supports MCP connections, such as one of the tools listed below. You also need access to the Nordcraft projects and organizations that you want to use.

:::info
All of the setup instructions use the same Nordcraft server address:
https://api.nordcraft.com/mcp
:::

Many AI tools let you add a server from a settings screen. If yours does, paste the address there. The examples below are only needed when your tool asks you to edit a settings file.

After you add the address, your AI tool will ask you to connect. A browser window opens so you can sign in to Nordcraft, review the requested permissions, and approve access. Once approved, your AI tool can use the connection for future requests.

:::info
You do not need an API key or a manually created access token. Never paste a password, access token, or other secret into your AI tool's settings or a Nordcraft project.
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

Claude Desktop uses a custom connector to connect to MCP servers. Do not add the Nordcraft server to `claude_desktop_config.json`.

1. In Claude Desktop, go to **Customize > Connectors**.
2. Select **+** and then **Add custom connector**.
3. Enter `https://api.nordcraft.com/mcp` as the server address.
4. Add the connector, select **Connect**, and approve access in the browser.
5. Enable the connector for the conversations where you want to use it.

### VS Code with GitHub Copilot

Open the Command Palette and run **MCP: Open User Configuration**. You can also add the server to a workspace `.vscode/mcp.json` file. Add the following settings:

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

Start or refresh the Nordcraft server from VS Code. When prompted, trust the server and sign in to Nordcraft in your browser.

### Cursor

Create a global `~/.cursor/mcp.json` file, or a project-specific `.cursor/mcp.json` file, and add the following settings:

```json
{
  "mcpServers": {
    "nordcraft": {
      "url": "https://api.nordcraft.com/mcp"
    }
  }
}
```

Reload Cursor if necessary, enable the server from **Customize**, and sign in to Nordcraft when Cursor asks you to connect.

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

Zed will automatically ask you to sign in to Nordcraft when the server first connects. You do not need to add your Nordcraft login details to the settings.

### OpenCode

Run the following command to add Nordcraft to all of your OpenCode projects:

```bash
opencode mcp add nordcraft --global --url https://api.nordcraft.com/mcp
```

To connect only the current project, remove `--global` from the command. You can check the connection by running:

```bash
opencode mcp list
```

If OpenCode reports that Nordcraft needs authentication, open OpenCode, run `/mcps`, select `nordcraft`, and sign in to Nordcraft in the browser.

## Get started

Once the connection is ready, you can use the tools you already know. You do not need to enter a tool name or remember its settings.

For the best results:

1. Ask your AI tool which Nordcraft account it is connected to.
2. Ask it to find your project.
3. Ask it to list the branches or create a new feature branch.
4. Ask it to inspect, update, and validate files on that branch.
5. Ask it to show you the changes before you merge them.

If your AI tool chooses the wrong project or branch, tell it the project's short ID and branch name. Both are included in the project and branch results.

File changes are saved to the branch you select. The `main` branch is read-only, so ask your AI tool to create or use a feature branch for changes.

You can also ask your AI tool directly, for example:

- “Use Nordcraft to find my website projects and show their branches.”
- “Look at the components on my latest feature branch and suggest accessibility improvements.”
- “Update the header on my feature branch, check the files for issues, and show me the changes before I merge them.”

## Available tools

After you sign in, the Nordcraft tools become available to your AI tool. You will usually use them by describing what you want in everyday language. The list below explains what each tool can do and what information it needs.

### Your account and projects

| Tool              | What it does                                                                     | Information needed                                                                   |
| ----------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `current_user`    | Checks which Nordcraft account is connected and which permissions are available. | Nothing                                                                              |
| `projects_search` | Finds projects that you can access.                                              | Optional filters for a project's short ID, name, organization, visibility, or type   |
| `projects_create` | Creates a new project from Nordcraft's starter template.                         | A project name, short ID, organization, and whether the project is private or public |

A project name can be up to 64 characters. A short ID can contain up to 40 lowercase letters or numbers.

`projects_search` returns up to 100 projects, with the most recently updated projects first. You can search by all or part of a project name, and the search does not consider capitalization.

### Branches and changes

| Tool              | What it does                                                | Information needed                        |
| ----------------- | ----------------------------------------------------------- | ----------------------------------------- |
| `branches_search` | Lists a project's branches, with the newest branches first. | The project                               |
| `branches_create` | Creates a new branch in a project.                          | The project and a name for the new branch |
| `diff`            | Shows what has changed on a branch compared with `main`.    | The project and branch                    |

A branch name must start with a lowercase letter. It can contain lowercase letters, numbers, and dashes, and can be up to 32 characters long.

### Project files

| Tool             | What it does                                                                       | Information needed                                |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------- |
| `files_glob`     | Finds files by folder or name pattern.                                             | The project, branch, and an optional file pattern |
| `files_read`     | Reads a project file and returns it in a format that is easy for AI to understand. | The project, branch, and file                     |
| `files_edit`     | Makes a change to one new or existing file and saves it to the branch.             | The project, branch, and requested change         |
| `files_validate` | Checks one or more project files for issues.                                       | The project, branch, and files to check           |

The AI tool handles the file locations and edit format for you. To point it to a specific file, you can describe the folder and name, such as `components/Header`. File searches are case-sensitive.

### Built-in Nordcraft guidance

These tools do not change your project. Instead, they give your AI tool additional guidance for working with Nordcraft correctly.

| Tool                    | Guidance it provides                                                  |
| ----------------------- | --------------------------------------------------------------------- |
| `skill-action`          | Creating custom actions and workflow steps                            |
| `skill-formula`         | Creating project formulas and calculations                            |
| `skill-component`       | Building components and pages, including their workflows and settings |
| `skill-theme`           | Working with themes, fonts, colors, and design variations             |
| `skill-stdlib-formulas` | Using Nordcraft's built-in formulas                                   |
| `skill-stdlib-actions`  | Using Nordcraft's built-in actions                                    |

## Keep your projects safe

The AI tool acts on your behalf and can make real changes to your Nordcraft account. Only connect tools that you trust, and review the permissions and actions they request.

:::warning
Work on a feature branch. Review every change, check edited files for issues, and inspect the branch changes before merging anything into your live project.
:::

Keep the connection safe by following these guidelines:

- Review requested permissions and only approve the access you need.
- Review changes before allowing an AI tool to make them automatically.
- Do not commit passwords, access tokens, or other secrets to source control.
- Do not store passwords, access tokens, or other secrets in Nordcraft project files.
- Disconnect the server from your AI tool when you no longer need it.
