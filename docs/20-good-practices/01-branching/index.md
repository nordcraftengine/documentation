---
title: Branching
description: Apply effective branch management with small, focused changes, frequent publishing, clear comments, and conflict resolution strategies.
---

# Branching

Effective branch management is essential for maintaining a stable application while developing new features. In Nordcraft, branches allow you to develop features in isolation without affecting your live application. Unlike traditional version control systems, Nordcraft's branching system is designed specifically for visual development, making it easier to track UI changes and collaborate with both technical and non-technical team members. Branching in Nordcraft helps you maintain development velocity while ensuring application stability.

For more details on the mechanics of branching, see the [Branches and publishing](/get-started/branches-and-publishing) page.

::: info
In Nordcraft, all new branches are automatically created from the current state of `main`. This prevents complex branching structures and helps avoid severe merge conflicts, especially in larger projects and teams.
:::

## Key takeaways

- Create small, focused branches for specific features or fixes
- [Publish changes](/get-started/branches-and-publishing#publish-changes) frequently to minimize conflicts and gather feedback early
- Test your changes with the [preview feature](/get-started/branches-and-publishing#preview-a-branch) before publishing
- Use clear branch names and descriptive comments for better collaboration
- [Sync with main](/get-started/branches-and-publishing#sync-with-main) regularly to stay up-to-date with changes from other team members

## Scope branches effectively

Branches in Nordcraft should have a clear, limited scope. Since all branches start from the `main` branch, it is important to break down larger features into smaller, manageable pieces:

- **Single responsibility**: Each branch should focus on one feature, bug fix, or improvement
- **Limited size**: Keep branches small and focused (e.g. "add-color-picker" rather than "redesign-interface")
- **Short lifespan**: Aim to complete and publish a branch within a single day
- **Clear naming**: Use descriptive names that reflect the purpose of the branch (e.g. "fix-login-validation" instead of "bug-fix")

::: tip
Small, focused branches are easier to review, test and publish. They also reduce the chance of conflicts when syncing with `main`.
:::

## Publishing frequently

Frequent publishing provides several benefits:

- **Smaller changes**: Smaller, incremental changes are easier to review and test
- **Earlier feedback**: Get feedback sooner rather than later
- **Reduced conflicts**: Minimize the chance of complex merge conflicts
- **Clearer history**: Create a more detailed and useful version history

::: tip
Publish changes as soon as they provide value, even small improvements. Frequent publishing leads to a smoother development process.
:::

## Branch comments

When publishing, write clear and concise comments that:

- Describe what changed (not how it changed)
- Provide context for future reference
- Are specific enough to identify the purpose of the change
- Help team members understand your work without requiring additional explanation

## Handling conflicts

When conflicts occur during syncing with `main`:

- Address them promptly rather than postponing
- Carefully review each conflict and choose the appropriate resolution
  - see also [resolve merge conflicts](/get-started/branches-and-publishing#resolve-merge-conflicts)
- Test thoroughly after resolving conflicts, but before publishing
- If conflicts are complex, consider creating a new branch from `main` and reapplying your changes

## Branch organization for teams

For teams working in Nordcraft:

- Consider using descriptive branch names that indicate the feature or fix being implemented
- Branch naming conventions (like `feature/name` or `fix/issue`) can be helpful
- Communicate about major changes that might affect other team members' work

By adopting these branching practices, you will create a more efficient development workflow, improve collaboration, and maintain a stable application that delivers consistent value to your users.
