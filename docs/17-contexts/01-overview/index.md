---
title: Contexts overview
description: Optimize component communication with contexts to share data between distant components in Nordcraft.
---

# Contexts

Contexts in Nordcraft provide a way to share data and functionality between components at different levels of your application hierarchy. Unlike attributes and events which work between directly connected parent and child components, contexts allow for communication between ancestor and descendant components at any level.

In traditional component architecture, data typically flows in two ways:

- **Downward**: From parent to child via [attributes](/components/interface-and-lifecycle#defining-attributes)
- **Upward**: From child to parent via [events](/components/interface-and-lifecycle#setting-up-events)

However, this approach can become unmanageable in complex component trees where data needs to flow through multiple levels. This can lead to "attribute drilling", which is where you pass data through intermediate components that don't need access to it, just to reach components deeper in the tree.

::: info
Contexts solve the attribute drilling problem by creating direct communication channels between components regardless of their nesting depth.
:::

## What can be shared with contexts

Contexts can share two types of component resources:

- [Formulas](/formulas/overview): share data and computed values from ancestor components to any descendant component
- [Workflows](/workflows/overview): expose functionality that descendant components can trigger directly

This flexibility allows you to share data and trigger actions across your component hierarchy without complex chains of attributes and events.

## Benefits of using contexts

Contexts offer several advantages for component communication:

- **Simplified data flow**: share data directly without passing through intermediate components
- **Reduced attribute management**: eliminate the need to declare and manage attributes at every level
- **Cleaner component APIs**: components only expose what they need in their direct interface
- **Enhanced component hierarchy**: create logical groupings of components that share common data
- **Improved maintainability**: changes to data structure only need to be made in one place

## When to use contexts

While contexts are powerful, they should be used strategically.

### Typical use cases for contexts

- Sharing theme data across an application
- Providing configuration settings to deeply nested components
- Managing form state across multiple form field components
- Creating component collections that work together (like tabs, accordions, etc.)
- Sharing authentication or user data with protected components

### When to prefer attributes and events

- For direct parent-child communication
- When the data flow is simple and linear
- For explicit, easy-to-follow data paths
- When creating highly reusable, independent components

## Contexts and reusability

Components that rely heavily on contexts are tightly coupled to their context providers. This is important because:

- Components may not work properly if their expected context isn't available
- Testing becomes more complex as components need their context providers
- Reusing components outside their original context requires more setup

However, context can also enhance reusability for component systems that are designed to work together, like a form system or a navigation system.

::: info
Contexts in Nordcraft can be optional. You can design components that behave differently depending on the context they are in.
:::

::: tip
Consider using a context provider component with slots to wrap other components. This pattern allows you to provide context to any components placed within the slots.
:::

## Global state with contexts

Context from a root-level component or page effectively creates global state, as all components in your application must be children. This can be useful for application-wide data, but should be used carefully to avoid creating an unwieldy global state that may become difficult to manage.
