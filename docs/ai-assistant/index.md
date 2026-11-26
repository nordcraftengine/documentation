---
title: AI Assistant
description: In Nordcraft you get your very own AI assistant that understands the context of your projects. Get help from the AI assistant right from the editor.
---

# AI Assistant

In Nordcraft you get access to your very own AI Assistant that understands the context of your projects and knows how to build for the web. The AI Assistant is also trained on the Nordcraft documentation and videos.

## Open the AI Assistant and Play mode

The AI Assistant is integrated directly with **Play mode**. You can access it by clicking the Play mode button on the [bottom bar](/the-editor/bottom-bar) or using the shortcut [kbd]Cmd/Ctrl[kbd] + [kbd]P[kbd].

If you are already in Play mode, pressing [kbd]Cmd/Ctrl[kbd] + [kbd]P[kbd] automatically focuses the prompt input field so you can immediately begin typing.

![The Nordcraft editor in Play mode, showing the AI Assistant window open on the right with the prompt bar at the bottom.|16/9](ai-assistant.webp 'AI Assistant')

## Enhancing prompts with Play mode tools

When in Play mode, the bottom bar provides specialized tools to enrich your prompts with exact context:

### Referencing canvas elements

Press [kbd]I[kbd] or click the crosshair icon on the bottom bar to activate the **AI Reference tool**. Click on any component or element on the canvas to attach it as a reference chip inside your prompt. This informs the AI precisely which element you want to modify, style, or query without needing to describe its location manually.

### Visual canvas annotations

Press [kbd]T[kbd] or select the annotation button on the bottom bar to open the **Annotation toolbar**. You can draw visual markups directly over your canvas to guide the AI:

- [kbd]P[kbd] - **Pen**: Freehand draw or circle areas that need changes
- [kbd]R[kbd] - **Rectangle**: Highlight blocks, containers, or layout regions
- [kbd]O[kbd] - **Ellipse**: Circle specific buttons or icons
- [kbd]L[kbd] - **Line**: Draw arrows indicating movement, direction, or relationships
- [kbd]T[kbd] - **Text**: Add floating text instructions directly onto the canvas
- [kbd]Escape[kbd] - Clear active annotations or exit the tool

The AI processes these visual markings alongside your text prompt, making design feedback and layout adjustments fast and intuitive.

## What can the AI do?

The AI Assistant can answer questions, plan features, and build your project, all in the same conversation. Describe what you want, and the AI works out whether to explain something, make a plan, or change your project.

The AI can:

- **Answer Nordcraft questions**: it can explain features, concepts, and best practices when building in Nordcraft
- **Search documentation**: it can find specific information from Nordcraft's official documentation
- **Analyze your project structure**: it can examine your current components, pages, workflows and other elements, and give you information on their functionality and advise about next steps
- **Plan features**: it can create a step-by-step plan for building features, components, or pages in your project, including which components, workflows, and formulas to use
- **Suggest improvements**: it can analyze your project and suggest improvements to your code, structure, or design
- **Build your project**: it can build and update pages, components, workflows, formulas, and styling
- **Work with media**: it can read and upload media files in your project

:::tip
If you want to agree on an approach before anything changes, ask the AI to make a plan first. You can then refine the plan in the conversation and ask the AI to build it when you are ready.
:::

:::tip
You can also attach an image to your request, such as a screenshot of a design. The AI will use this image when analyzing your request but cannot insert it directly into the design.
:::

### Follow the AI as it works

The **Follow** toggle at the top of the AI panel lets you watch the AI while it builds. Follow is on by default. When it is on, the editor automatically navigates to the file the AI is editing, so you can sit back and follow its work as it moves between pages and components.

If you start interacting with the editor while the AI works, Follow turns off automatically so the AI doesn't interrupt you. Turn it back on at any time to continue following along.

### Changes and rolling back

The AI makes its changes directly to the branch you are working on, so you can see the result on the canvas as soon as it is done.

![The Nordcraft editor with a landing page for a design studio built by the AI on the canvas. The AI panel on the right shows the AI confirming its plan, the steps it took, and the components and page it created, followed by an All changes list above the prompt input with a Reset option for each file.|16/9](ai-build-mode.webp 'The AI building a page')

At the bottom of the AI panel, above the prompt input, the **All changes** list shows every file the AI has created or edited. If you are not happy with the result, you can roll back the latest changes from here:

- **Undo**: roll back all of the latest changes
- **Reset**: roll back the changes to a single file

:::info
Changes made by the AI stay on your branch. Your live website is not affected until you [publish your changes](/version-control/managing-changes#publishing-changes) in Ship mode.
:::

### Credits, models, and effort

The AI Assistant uses a credit system. You get a number of free credits each day, and if you need more credits, you can purchase them directly from inside the Nordcraft editor.

:::info
Daily free credits are assigned to each individual user of Nordcraft. Any credits purchased will be available to all members of an organization to use. If you are a member of more than one organization, the purchased credits will apply to the organization of the project you were editing when you completed the checkout process.
:::

The amount of credits used depends on the model you choose, the effort level, and the complexity of the task.

#### Models

You can pick a model from the model picker at the bottom of the AI panel, where each model is marked with a cost level:

| Cost level | Best use case                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------- |
| $          | Quick everyday tasks, like small edits, styling tweaks, and simple questions.                              |
| $$         | Most build tasks, like creating components and pages.                                                      |
| $$$        | The most capable models. Use these for large or complex tasks, or when other models struggle to fix a bug. |

More capable models usually cost more credits, so it is worth starting with a cheaper model and switching to a more capable one if the result is not what you need.

#### Effort

Next to the model picker, you can set the **effort** level. The effort level controls how much time the AI spends thinking about your request before and while it works. The available levels, such as **Low**, **Medium**, or **High**, depend on the model you have chosen, as different models support different levels.

- **Lower effort** is faster and uses fewer credits. It works well for simple, well-defined tasks.
- **Higher effort** lets the AI reason more carefully, which can give better results on complex tasks, but it takes longer and uses more credits.

### Ask mode

The AI Assistant switches to **Ask mode** when it cannot make changes to your project. This happens when:

- **You are on the `main` branch**: the `main` branch [cannot be edited directly](/version-control/overview), so the AI cannot build there. Switch to another branch, or create a new one, to build with the AI.
- **You are out of credits**: you can keep chatting in Ask mode until your daily free credits are renewed, or you can purchase more credits from inside the Nordcraft editor.

In Ask mode the AI can still answer Nordcraft questions, search the documentation, analyze your project structure, and give you implementation tips, but it cannot make changes to your project.

:::info
Using Ask mode is free of charge.
:::

## Connectors

You can extend what the AI Assistant can do by adding [Connectors](/connectors). Connectors allow the AI to connect directly to external design tools like Figma and Miro, or fetch content and data models from platforms like Supabase, Contentful, and Sanity.
