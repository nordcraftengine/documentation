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

The AI can perform a number of tasks to help you understand and build projects in Nordcraft. You can choose between 3 modes:

![The AI assistant mode window, showing three modes available: ask, plan, and build.|16/9](ai-mode-select.webp 'Choose your AI mode')

### Ask mode

When in Ask mode the AI can perform the following tasks:

- **Answer Nordcraft questions**: it can explain features, concepts, and best practices when building in Nordcraft
- **Search documentation**: it can find specific information from Nordcraft's official documentation
- **Analyze your project structure**: it can examine your current components, pages, workflows and other elements, and give you information on their functionality and advise about next steps
- **Provide implementation tips**: it can explain approaches and direct you to the right tools for building features

:::info
Using Ask mode is free of charge.
:::

### Plan mode

When in Plan mode the AI can perform the following tasks:

- **Generate project plans**: it can create a step-by-step plan for building features, components, or pages in your project.
- **Provide implementation guidance**: it can give you advice on how to implement features, including which components, workflows, and formulas to use.
- **Suggest improvements**: it can analyze your project and suggest improvements to your code, structure, or design.

### Build mode

When in Build mode the AI can also help you build your project. This includes building and updating pages, components, workflows, formulas, and styling.

#### Using build mode

When you ask the AI for changes in build mode, you will enter `Preview mode`.

![The AI panel in build mode, showing the user has entered the following prompt: Build me a landing page for a design agency focussing on simplicity, creativity, and curiosity. The colour palette should be monochrome, with bold display fonts. The overall feel should be calm and professional. This image is annotated relating to the list items below.|16/9](ai-build-mode.webp 'AI Build mode')

1. See a list of created or edited files above the input field in the AI panel.
2. Navigate through the changes proposed by the AI using the top bar.
3. Choose to accept or reject the proposed changes currently visible.

Build mode uses a credit system. You get a number of free credits each day, and if you need more credits, you can purchase them directly from inside the Nordcraft editor.

:::info
Daily free credits are assigned to each individual user of Nordcraft. Any credits purchased will be available to all members of an organization to use. If you are a member of more than one organization, the purchased credits will apply to the organization of the project you were editing when you completed the checkout process.
:::

The amount of credits used depends on the model you chose and the complexity of the task. You can select between the following models:

| Name       | Cost | Best use case                                                                         |
| ---------- | ---- | ------------------------------------------------------------------------------------- |
| Fast       | 💰   | Most build tasks.                                                                     |
| Thoughtful | 💰💰 | Task analysis. Use this mode when Fast has problems finding and fixing annoying bugs. |

:::tip
In Build mode you can also attach an image to your request, such as a screenshot of a design. The AI will use this image when analyzing your request but cannot insert it directly into the design.
:::

## Connectors

You can extend what the AI Assistant can do by adding [Connectors](/connectors). Connectors allow the AI to connect directly to external design tools like Figma and Miro, or fetch content and data models from platforms like Supabase, Contentful, and Sanity.

## What the AI can't do

While the AI Assistant in Build mode can propose changes for your project, it cannot apply those changes directly. You must review and manually accept or reject each suggestion, ensuring you maintain full control over your project.

Additionally, the AI cannot currently:

- **Create services in Nordcraft**
- **Upload or read media files in Nordcraft**
