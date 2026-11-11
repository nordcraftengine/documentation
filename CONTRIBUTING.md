# Contributing to the Nordcraft Documentation

We're thrilled that you're interested in contributing to Nordcraft's documentation!

For complete contribution guidelines, please refer to our [Contribution Guide](/docs/guides/contribution/index.md).

This guide contains all the information you need about:

- formatting requirements
- content standards
- screenshot generation and processing tools
- the contribution workflow process

## Screenshots

We provide built-in scripts to automate screenshot generation and keep images consistent with documentation guidelines:

- `bun <path/to/screenshot.ts>`: Run an individual co-located screenshot script directly.
- `bun run screenshots [target]`: Automatically capture all or matching documentation screenshots using Playwright.
- `bun run screenshots:annotate [target]`: Open the visual Annotation Studio to place and edit badges, boxes, and labels with a live canvas.
- `bun run screenshots:record [target]`: Open an interactive browser with session mocks to record user clicks for new screenshots.
- `bun run screenshots:process <input.png> <target>`: Convert and resize external PNG/JPEG captures into standard (`800x450`) and large (`3200x1800`) WebP files with annotations.

See the [Contribution Guide](/docs/guides/contribution/index.md#screenshot-tooling) for full details.

## List of Contributors

In order to be listed as a contributor, please add your email/username to the [contributors.json](/proxy/contributors.json) file.

## Code of Conduct

This project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

## Questions?

If you have any questions, please feel free to contact the [Nordcraft team on Discord](https://discord.gg/nordcraft) or open an issue for discussion.

Thank you for your contributions to making Nordcraft's documentation better for everyone!
