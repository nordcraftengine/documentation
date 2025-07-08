---
title: Contributing
description: Learn how to create well-structured, consistent documentation pages for Nordcraft, following formatting guidelines and content best practices.
---

# Contributing

This guide helps you understand how to contribute to the Nordcraft documentation. Whether you're adding a completely new page or updating existing content, following these guidelines ensures consistency across the documentation.

## Documentation structure

The Nordcraft documentation is organized into sections and individual pages:

- **Sections**: Main categories like "Get started," "Components," or "Styling"
- **Pages**: Individual documents that can be within sections or standalone (like the "About" page)

Each section and page corresponds to a folder in the [GitHub repository](https://github.com/nordcraftengine/documentation):

- Sections and pages are numbered (01, 02, 03...) to determine their order in the side menu
- The content of each page is stored in an `index.md` markdown file
- All related images are placed in the same folder as the page's `index.md` file

## Creating a new page

### File setup

1. Identify which section your page belongs to
2. Create a new folder with the appropriate number (to maintain order) and name
   - For example: `05-the-editor` for the main section
   - Or `05-the-editor/03-bottom-bar` for a page within a section
3. Create an `index.md` file within this folder

## Required structure

Each documentation page needs:

1. **YAML frontmatter** at the top of the file with:
   - `title`: Page title in sentence case (used for the page's title)
   - `description`: Brief overview of the page's content (used for the page's meta description, keep this to under 155 characters if possible)

2. **Main content** with properly structured headings and content, starting with an H1 heading that matches the title

## Formatting requirements

### Frontmatter

Each page must begin with YAML frontmatter at the very top of the file between triple dashes:

\----
title: Page title
description: Brief description explaining what this page covers.
\----

- The **title** is used for SEO metadata and should be in **Sentence case**
- The **description** should be a brief overview (1-2 sentences) that helps with SEO
- After the frontmatter, your content should start with an H1 heading that matches the title

## Heading hierarchy

- **H1 (#)**: Used for the main title of the page (matching the frontmatter title), each page should have only one H1 heading
- **H2 (##)**: Used for subsections within the main sections
- **H3 (###)**: Used for topics within subsections
- **H4 (####)**: Used for detailed points within topics (use sparingly)

When writing headings, use sentence case (use a capital letter for the first word of the heading only), except where other words require specific capitalization, such as Nordcraft or GitHub.

## Text formatting

- Use **bold** to emphasize important terms
- Use _italics_ sparingly for emphasis
- Keep paragraphs short (3-5 sentences maximum)
- Use American English spellings

## Code and UI elements

- Use backticks for inline code: `variable`
- Use `[kbd]` For UI buttons and keyboard shortcuts: [kbd]Button Name[kbd]

## Links

- Internal documentation links: `[Page Name](/path/to/page#section)`
- External links: `[Resource Name](https://example.com)`

## Lists

- Use bullet points for non-sequential items
- Use numbered lists for sequential steps
- Keep list items parallel in structure

## Callouts

Callouts highlight important information. Use them in this format:

::: info
General information notes
:::

::: tip
Helpful practices and advice
:::

::: dev
Developer-specific technical details
:::

::: warning
Caution information
:::

::: danger
Critical warnings
:::

## Images

Include images with descriptive alt text, an image title and aspect ratio:

`![Image alt text|16/9](image-name.webp 'Image title')`

For screenshots that link to the Nordcraft editor (allowing readers to see it live in the editor):

`![Image alt text|16/9](image-name.webp 'Image title'){https://editor.nordcraft.com/projects/docs_examples/branches/main/...}`

Image requirements:

- All images should be in `WebP` format
- Images should have a 16/9 aspect ratio
- Create two versions of each image:
  - Standard version: 800px width (e.g., `image-name.webp`)
  - Large version: 3200px width with "-large" suffix (e.g., `image-name-large.webp`)
- Place all images in the same folder as the page's `index.md` file
- If a link is included, ensure that it points to the `main` branch
- The image title will be used to overlay a title on the image in the UI
- The image alt text will be added to the `<img>` tag in the resulting markup

::: info
You may see `@@@ image-static` in places. This tag is for Nordcraft brand images that do not expand into the large view. You should only add static images if you need to display images that don't serve as example images that should not be expandable, and do not have an outgoing link.

Always include an aspect ratio with your static images in this form:

`![Image alt text|2/1](static-image.webp 'Image title')`
:::

## Examples

For component examples, use the following format:

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-class-based-style.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-class-based-style?mode=design&selection=nodes.RXXxhmSNTU21VntB7mKuh&canvas-width=800&rightpanel=attributes&canvas-height=800
height: 18rem

Click to select and unselect the card.
@@@

Example requirements:

- Examples must be built in the `docs_examples` Nordcraft project
- Each example is implemented as a separate web component
- Always link to the `main` branch in the `editorUrl`
- Set an appropriate `height` value in `rem` units
- Add a description after the height (separated by a new line) that will be displayed within the example window

## YouTube videos

To embed YouTube videos in the documentation, use the following format:

@@@ youtube
videoId: ulZJTV3ouHs
title: Working with the issues panel
@@@

Make sure to:

- Use the correct YouTube video ID (the part after `v=` in the YouTube URL)
- Include a descriptive title that explains what the video demonstrates

## Content guidelines

### Branding consistency

- Always write "Nordcraft" with a capital "N"
- Use consistent terminology for features and concepts
- Avoid marketing language and unnecessary superlatives like "powerful" or "best"
- Don't include version information that will become outdated

### Page structure

1. **Introduction**: Begin with a brief explanation of the feature or concept
2. **Main content**: Explain key concepts with clear examples or images
3. **Related information**: Link to relevant documentation throughout the page where appropriate

Each page should be self-contained and understandable on its own, while still connecting to the broader documentation through relevant links.

### Common sections

Depending on the page type, consider including:

- **Definition**: What is this feature?
- **Purpose**: Why would someone use it?
- **Example**: How does it work in practice?
- **Steps**: How to implement it
- **Best practices**: Tips for optimal usage
- **Common issues**: Troubleshooting guidance

::: info
The references pages for formulas and actions are special pages, where content below the introduction is generated from a Nordcraft API at build time. If you notice something wrong with the generated content for formulas and actions, please [open an issue on GitHub](https://github.com/nordcraftengine/documentation/issues/new).
:::

### Writing style

- **Clear and concise**: Use simple, direct language
- **Formal but approachable**: Professional but not academic
- **Action-oriented**: Focus on how to use features
- **Use present tense and use active voice**: Address the reader directly ("you")

::: tip
Use the active voice to provide clear instructions using "you" where possible. For example:

- **Do this**: _You can click the `+` button to add a new action._
- **Do not do this**: _The `+` button can be clicked to add a new action._

:::

Keep in mind the following when updating or adding documentation:

- Do not use unnecessary words or marketing language
- Do not include placeholder text or TODOs
- Do not reference personal opinions or subjective assessments
- Do not create circular references or links to non-existent pages
- Do not include screenshots that reveal user data
- Do not use inconsistent formatting or terminology

::: info
Following these guidelines will help ensure that the Nordcraft documentation remains consistent, clear and helpful for all users.
:::

### Front-end and front end vs back-end and back end

- Use `front end` and `back end` when referring to a noun e.g. _"View your changes on the front end."_
- Use `front-end` and `back-end` when using those phrases as an adjective e.g. _"Paste the URL of your back-end API into the input field."_

## Contributing via GitHub

Since the Nordcraft documentation is hosted on [GitHub](https://github.com/nordcraftengine/documentation), you will need to follow standard Git workflows to contribute:

1. **Fork the repository**: Create your own copy of the documentation repository
2. **Clone locally**: Download your fork to your local machine
3. **Create a branch**: Make a new branch for your contribution
4. **Make changes**: Edit or add files following the guidelines in this document
5. **Test your changes**:
   - Use the [preview](#previewing-documentation) feature to verify your documentation looks correct
   - Test all links to ensure they point to valid pages
   - Review your content for clarity, accuracy, and completeness
   - Check that images display properly and have appropriate title
   - Verify that all examples work correctly, demonstrate the intended functionality and have working links to the editor
   - Ensure all formatting is consistent with the documentation guidelines
6. **Commit and push**: Save your changes and push them to your fork
7. **Create a pull request**: Submit your changes from your fork to the main repository and complete the pull request template provided

::: tip
If you're new to Git version control, check out the [official Git documentation](https://git-scm.com/book/ms/v2/Getting-Started-About-Version-Control).
:::

## Pull request process

When submitting a pull request (PR):

1. **Ensure relevance**: PRs should address an existing issue or have been discussed with the team beforehand
2. **Provide a clear title**: Summarize what your changes accomplish
3. **Add a detailed description**: Explain the purpose of your changes
4. **Complete the issue template checklists**: Check off items you have completed that are relevant to the PR
5. **Reference issues**: If your changes address an existing issue, reference it
6. **Be responsive**: Watch for comments or requests for changes from reviewers

After submitting your pull request, the Nordcraft team will review your contribution. They may suggest changes or improvements before merging your work into the main documentation.

## Formatting

We use Prettier to automatically format the documentation in markdown and the proxy worker. We have included a script you can run in your terminal to auto format files to make sure your pull request gets approved.

::: info
You'll need to install `bun` to run the formatting script. [Learn how to install bun for your operating system](https://bun.sh/docs/installation).
:::

To use Prettier on your machine, we suggest [installing the Prettier extension in your IDE](https://prettier.io/docs/editors) and enabling formatting on save.

1. To install dependencies to use the script, run `bun i` in the root of the repository.
2. Run `bun prettier` in your terminal to validate your changes
3. Run `bun prettier:write` in your terminal to auto format all files

## Previewing documentation

To preview documentation pages while you're working on them:

1. Add the query parameter `?mode=preview` to the URL of any documentation page
2. A preview configuration panel will appear at the bottom of the page
3. Enter the following information in the input fields:
   - Repository owner (e.g. `nordcraftdev`)
   - Repository name (e.g. `documentation`)
   - Branch name (e.g. `main` or your feature branch)
4. Click the [kbd]Update[kbd] button to load and preview the documentation from your specified source

This preview feature allows you to see how your changes will look before they're published, making it easier to identify and fix formatting issues.

## Code of conduct

By participating in the Nordcraft documentation project, you agree to abide by the project's [Code of Conduct](https://github.com/nordcraftengine/documentation/blob/main/CODE_OF_CONDUCT.md). This ensures a welcoming and inclusive environment for all contributors.

## Questions and support

If you have questions about contributing to the documentation or need assistance with your contributions:

- [Open a new issue](https://github.com/nordcraftengine/documentation/issues/new) in the Nordcraft documentation repository for discussion
- Contact the Nordcraft team in the [Nordcraft Discord](https://discord.gg/nordcraft)
- Ask in the community forums or discussion areas

The Nordcraft team is committed to helping new contributors and appreciates your efforts to improve the Nordcraft documentation.
