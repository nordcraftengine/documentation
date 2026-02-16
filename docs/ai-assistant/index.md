---
title: AI Assistant
description: In Nordcraft you get your very own AI assistant that understands the context of your projects. Get help from the AI assistant right from the editor.
---

# AI Assistant

In Nordcraft you get access to your very own AI Assistant that understands the context of your projects and knows how to build for the web. The AI Assistant is also trained on the Nordcraft documentation and videos.

## Open the AI Assistant

You can access the AI Assistant by clicking the "Ask AI" button on the bottom bar, or by using the keyboard shortcut [kbd]Cmd/Ctrl[kbd]+[kbd]I[kbd]. The AI Assistant opens to the right of the editor, allowing you to continue to work alongside it.

![The Nordcraft editor, showing the AI Assistant window open on the right, with an input field at the bottom of it that says start typing. The Ask AI button on the bottom bar is hovered over, which shows it having a lighter grey background than the grey background of the bottom bar.|16/9](ai-assistant.webp 'AI Assistant')

## What can the AI do?

The AI can perform a number of tasks to help you understand and build projects in Nordcraft. You can choose between 2 modes:

### Ask

When in Ask mode the AI can perform the following tasks:

- **Answer Nordcraft questions**: it can explain features, concepts, and best practices when building in Nordcraft
- **Search documentation**: it can find specific information from Nordcraft's official documentation
- **Analyze your project structure**: it can examine your current components, pages, workflows and other elements, and give you information on their functionality and advice about next steps
- **Provide implementation tips**: it can explain approaches and direct you to the right tools for building features

Using the Ask mode is free of charge

### Build

When in Build mode the AI can, in addition to the capabilities of the Ask mode, also help you build your project. This includes building pages, components, workflows, formulas, etc.

#### Using build mode

Once the AI starts building something you will enter a _"Preview mode"_. While in this mode you will see all the edited files in a box just above the input field in the AI menu. You will also be able to see what the AI has built in the editor before applying the changes to your project by navigating the files using the top bar and accepting or rejecting the files one by one. You can also accept or reject all files at once by using the buttons in the box above the input field in the AI panel.

Using the Build mode costs credits. The amount of credits spent depends on the model you chose and the complexity of the task. You can select between the following models:

- **Gemini 3 Flash** (recommended): this is the cheapest model to use. It's a good model all round that gives good results. Flash focuses on completing the task while keeping the credits spent to a minimum
- **Gemini 3 Pro**: this model is more expensive than the Flash model. This is due to it using more credits on analyzing a task. This model can be helpful when Flash has problems finding that annoying bug
- **Claude Opus 4.6**: this model is significantly more expensive than the other 2. This model is great at both logic and design and can help you out with creating beautiful components.

While in build mode you can also attach an image to your request. The AI will then use this image when analyzing your request.

:::warning
The AI cannot currently insert the image in the editor. It will only use it for analyzing your request.
:::

## What can't the AI do?

While the AI Assistant in Build mode can suggest changes and generate code for your project, it cannot apply those changes directly. You must review and manually accept or reject each suggestion, ensuring you maintain full control over your project and avoid any unintended modifications.

Additionally, the AI currently cannot:

- **Create or read services**
- **Upload or read media files**

:::info
The Nordcraft AI is currently in Beta. New features will be added and current features are subject to changes.
:::
