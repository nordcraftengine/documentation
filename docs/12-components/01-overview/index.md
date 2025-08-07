---
title: Component fundamentals
description: Learn how components work in Nordcraft, and how using components can help you build maintanable, organized, and powerful applications.
---

# Components in Nordcraft

Components are the fundamental building blocks of applications in Nordcraft. Using components, you can create reusable parts of your application and break large applications down into smaller, more manageable pieces.

Components in Nordcraft are self-contained, reusable elements that encapsulate structure, styles and behavior. They function like tiny web applications on their own, with the ability to:

- Render elements on a page
- Store data in variables
- Call APIs and process data
- Respond to user interactions
- Communicate with other components
- Encapsulate logic
- Implement functionality in isolation
- Maintain their own internal state

Each component has its own structure, data model, and behavior. This makes components neatly reusable across your project. The encapsulation of both UI and logic creates building blocks that can be combined to create increasingly sophisticated applications.

::: info
Components combine HTML structure, CSS styles, and interactive JavaScript behavior into reusable parts.
:::

::: dev
Nordcraft components work in very similar ways to other JavaScript frameworks like React, Vue, and Svelte.
:::

## Benefits of using components

Breaking your application into components provides several advantages:

- **Reusability**: Build functionality once and use it many times
- **Maintainability**: Changes to a component apply everywhere it is used
- **Organization**: Divide complex applications into manageable pieces
- **Consistency**: Ensure UI elements look and behave the same way throughout your application
- **Collaboration**: Different team members can work on different components simultaneously
- **Testing**: Components can be tested in isolation

::: tip
A well-designed component library can accelerate development and ensure scalability and maintainability as projects grow.
:::

## Component structure and anatomy

A component in Nordcraft can consist of:

- **Root element**: The top-level container element
- [Element tree](/the-editor/element-tree): The hierarchy of elements that make up the component
- [Attributes](/components/interface-and-lifecycle#defining-attributes): The interface for passing data into the component
- [Variables](/variables/overview): Internal state and data management
- [APIs](/connecting-data/overview): Connections to external services and data sources
- [Events](/components/interface-and-lifecycle#setting-up-events): The interface for communicating out from the component
- [Formulas](/formulas/overview): Calculations and data transformations
- [Workflows](/workflows/overview): Internal logic and behavior
- [Contexts](/contexts/overview): Communication with ancestor and descendant components or elements

### Data encapsulation

Components in Nordcraft encapsulate their data, meaning that variables, APIs, and other internal aspects of one component are not accessible by other components. At first, this isolation may seem limiting, but it's an essential design principle that helps maintain order as your application grows in complexity.

This encapsulation ensures that components:

- Have clear boundaries and responsibilities
- Can be modified internally without affecting other parts of the application
- Are easier to understand, as their behavior depends only on their own code and inputs

::: info
Each component is like a `black box` that hides its implementation details while exposing a clear interface.
:::

### Component composition

Components are composable, meaning they can be combined together to form more complex components. This composition model allows you to:

- Create a hierarchy of increasingly complex UI elements
- Build applications with reusable parts
- Share functionality between different areas of your application

Components can send data to other components and pages through:

- **Attributes**: Pass data down to child components
- **Events**: Send data up to parent components
- **Contexts**: Create direct communication channels with ancestor and descendant components

This communication pattern enables components to work together while maintaining their independence and encapsulation.

## Working with component instances

When you add a component to a page or another component, you're creating an instance of that component. Each instance:

- Has its own set of attribute values
- Can be styled independently (affecting only the root element, see [component style overrides](/styling/conditional-styles#component-style-overrides))
- Works independently of other instances of the same component

Understanding how components work and how they fit into the overall structure of your application is the foundation for creating maintainable, scalable applications in Nordcraft.
