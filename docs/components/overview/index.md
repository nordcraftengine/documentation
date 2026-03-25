---
title: Component fundamentals
description: Learn how components work in Nordcraft, and how using components can help you build maintanable and organized websites.
---

# Components in Nordcraft

You can use components in Nordcraft to break down large projects into smaller reusable building blocks for your websites in Nordcraft.

Components in Nordcraft are self-contained, reusable elements that encapsulate structure, styles and behavior. Components can:

- Render elements on a page
- Store data in variables
- Call APIs and process data
- Respond to user interactions
- Communicate with other components
- Encapsulate logic
- Implement functionality in isolation
- Maintain their own internal state

Each component has its own structure, data model, and behavior.

::: info
Components combine HTML structure, CSS styles, and interactive JavaScript behavior into reusable parts.
:::

::: dev
Nordcraft components work in very similar ways to how components work in other JavaScript frameworks like React, Vue, and Svelte.
:::

## Benefits of using components

Breaking your websites into components provides several advantages:

- **Reusability**: Build functionality once and use it many times
- **Maintainability**: Changes to a component apply everywhere it is used
- **Organization**: Divide complex projects into manageable pieces
- **Consistency**: Ensure UI elements look and behave the same way throughout your website
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

Components in Nordcraft encapsulate their data, meaning that variables, APIs, and other internal aspects of one component are not accessible by other components. This ensures that components:

- Have clear boundaries and responsibilities
- Can be modified internally without affecting other parts of the project
- Are easier to understand, as their behavior depends only on their own code and inputs

Components can send data to other components and pages through:

- **Attributes**: Pass data down to child components
- **Events**: Send data up to parent components
- **Contexts**: Create direct communication channels with ancestor and descendant components

This communication pattern enables components to work together while maintaining their independence and encapsulation.

### Component composition

Components are composable, meaning they can be combined together to form more complex components. This allows you to:

- Create a hierarchy of increasingly complex UI elements
- Build large websites with reusable parts
- Share functionality between different areas of your website

## Working with component instances

When you add a component to a page or another component, you're creating an instance of that component. Each instance:

- Has its own set of attribute values
- Can be styled independently (affecting only the root element, see [component style overrides](/styling/conditional-styles#component-style-overrides))
- Works independently of other instances of the same component
