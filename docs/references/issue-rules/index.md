---
title: Issue rules
description: Improve the quality of your projects by detecting and fixing potential problems early with Nordcraft's issue rules.
---

# Issue rules

Nordcraft's issue rules help you maintain high-quality standards in your projects by highlighting common problems.

::: tip
To learn more about where issue rules are shown in the editor, check out the [issues panel](/the-editor/issues-panel).
:::

::: tip
To see how issue rules are implemented, visit the [Nordcraft GitHub repository](https://github.com/nordcraftengine/nordcraft/tree/main/packages/search/src/rules).
:::

## Components

## Formulas

| Rule                                     | Severity |     Auto fixes     | Description                                                                                                                                                                                            |
| ---------------------------------------- | -------- | :----------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Project formulas with no references**  | Warning  | Delete the formula | Project formulas that are not referenced anywhere in your project can lead to confusion and bloated projects. Nordcraft flags these unused formulas to help you keep your project clean and efficient. |
| **Unknown project formula reference**    | Error    |         No         | Finds references to project formulas that do not exist. This helps you identify and correct broken references in your project.                                                                         |
| **Legacy formula**                       | Warning  |  Replace formula   | Finds known legacy formulas that should no longer be used.                                                                                                                                             |
| **Component formulas with no reference** | Warning  |         No         | Finds component formulas that are not used by any other formulas in a component.                                                                                                                       |
| **Unknown component formula input**      | Warning  |         No         | Finds invalid component formula inputs.                                                                                                                                                                |
| **Unknown project formula input**        | Warning  |         No         | Finds invalid project formula inputs.                                                                                                                                                                  |
| **Unknown component formula reference**  | Warning  |         No         | Finds references to unknown component formulas.                                                                                                                                                        |
| **Unknown repeat index formula**         | Warning  |         No         | Finds usage of repeat index formulas that are not within a valid repeat context.                                                                                                                       |
| **Unknown repeat item formula**          | Warning  |         No         | Finds usage of repeat item formulas that are not within a valid repeat context.                                                                                                                        |

## Actions

| Rule                                   | Severity |     Auto fixes     | Description                                                                                                                                                                                                             |
| -------------------------------------- | -------- | :----------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Project actions with no references** | Warning  | Delete the action  | Project actions that are not referenced anywhere in your project can lead to confusion and bloated projects. This rule flags unused project actions to help keep project clean and efficient.                           |
| **Unknown project action references**  | Warning  |         No         | Finds references to project actions that do not exist. This helps identify and correct broken references in projects.                                                                                                   |
| **Legacy action**                      | Warning  | Replace the action | Finds known legacy actions that should no longer be used.                                                                                                                                                               |
| **No console**                         | Info     |         No         | Detects usage of the [Log to console](references/actions##log-to-console) action in workflows. While useful for debugging, leaving console logs in production code can lead to performance issues and cluttered output. |

## Variables

| Rule                             | Severity |     Auto fixes      | Description                                                                                                                    |
| -------------------------------- | -------- | :-----------------: | ------------------------------------------------------------------------------------------------------------------------------ |
| **Variables with no references** | Warning  | Delete the variable | Variables that are not referenced anywhere in a component have no effect/value and can safely be removed.                      |
| **Unknown variable references**  | Error    |         No          | Finds references to variables that do not exist. This helps identify and correct broken references in components.              |
| **Unknown variable setter**      | Warning  |         No          | Trying to set a variable that doesn't exist will have no effect, but usually highlights an issue in the logic for a component. |

## Attributes

| Rule                              | Severity |           Auto fixes           | Description                                                                                                                             |
| --------------------------------- | -------- | :----------------------------: | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Attributes with no references** | Warning  |      Delete the attribute      | Attributes that are not referenced anywhere in a component are not needed and can be removed.                                           |
| **Unknown attribute reference**   | Error    |               No               | Finds references to attributes that do not exist in a component. This helps you identify and correct broken references in your project. |
| **Unknown component attribute**   | Error    | Delete the component attribute | Identifies attributes on component nodes that don't exist on the target component. These invalid attributes can safely be removed.      |

## Events

| Rule                          | Severity |                                            Auto fixes                                            | Description                                                                                                                  |
| ----------------------------- | -------- | :----------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------- |
| **Duplicate event trigger**   | Warning  |                                                No                                                | Flags duplicate event triggers on an element or component node. This usually happens in legacy projects.                     |
| **Events with no references** | Warning  |                                         Delete the event                                         | Finds events in a component that are never triggered. These events can be removed to keep the component clean and efficient. |
| **Unknown event**             | Error    |        Flags events declared on component nodes that don't exist in the target component.        |
| **Unknown event trigger**     | Error    | Finds event triggers in components that don't match any of the declared events in the component. |

## APIs

| Rule                              | Severity |       Auto fixes       | Description                                                                                                                                                                               |
| --------------------------------- | -------- | :--------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **APIs with no references**       | Warning  |     Delete the API     | API that are never referenced in their component are usually not needed and can be removed.                                                                                               |
| **Unknown API**                   | Error    |           No           | Finds references to unknown APIs.                                                                                                                                                         |
| **Legacy API**                    | Warning  |           No           | Finds APIs that could be upgraded to the newer API v2 format. This conversion can be done from within the Nordcraft editor.                                                               |
| **Invalid parser mode**           | Warning  |           No           | Flags if an invalid parser mode for an API has been declared. The valid parser modes are: `json`, `text`, and `auto`.                                                                     |
| **Invalid proxy body**            | Warning  |           No           | Flags if an API is set to use templates (for cookie injection) in the body, but the API is not proxied.                                                                                   |
| **Invalid proxy cookie**          | Warning  |           No           | Flags APIs that are not proxied but are using a `Get Http-Only Cookie` formula. The template replacement will only work in the Nordcraft API proxy.                                       |
| **API inputs with no references** | Warning  |           No           | API inputs that are not used in the API (for headers, body etc.) are not needed.                                                                                                          |
| **Unknown API Input**             | Error    |           No           | Finds references to unknown/invalid API inputs.                                                                                                                                           |
| **Unused API services**           | Warning  | Delete the API service | API services that are never used by any API can safely be removed.                                                                                                                        |
| **Unknown API service**           | Warning  |           No           | Flags APIs that reference unknown API services. This means the API doesn't benefit from the schema provided by the API service and could indicate that a service was deleted by accident. |

## Context

| Rule                                 | Severity | Auto fixes | Description                                                                                                                                                                                                                               |
| ------------------------------------ | -------- | :--------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **No context consumption possible**  | Warning  |     No     | Flags components that expose formulas or workflows in context, but don't have a slot element or a component as a child. This would mean that it was not possible for other components/elements to consume the context formulas/workflows. |
| **Unknown context formula**          | Error    |     No     | Finds references to unknown context formulas. This could happen if a context provider no longer had a formula by the name declared in the context consumer's reference.                                                                   |
| **Unknown context provider formula** | Error    |     No     | Finds references to un-exposed context formulas. This could happen if a context formula had previously been exposed in context, but was now no longer exposed.                                                                            |
| **Unknown context provider**         | Error    |     No     | Finds references to context providers (components) that don't exist in the project.                                                                                                                                                       |

## Style

| Rule                     | Severity |        Auto fixes         | Description                                                           |
| ------------------------ | -------- | :-----------------------: | --------------------------------------------------------------------- |
| **Invalid style syntax** | Error    | Delete the style property | Finds invalid style properties/syntax on elements and components.     |
| **Unknown classname**    | Error    |            No             | Flags style variants that reference unknown classnames on an element. |

## Slots

| Rule                       | Severity | Auto fixes | Description                                                                             |
| -------------------------- | -------- | :--------: | --------------------------------------------------------------------------------------- |
| **Unknown component slot** | Error    |     No     | Flags slotted elements/components that reference an unknown slot in the host component. |

## DOM

| Rule                            | Severity | Auto fixes | Description                                                                                                                                                                                                                |
| ------------------------------- | -------- | :--------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Required direct child**       | Warning  |     No     | Flags elements that have an invalid direct child element. For instance, a `<ul>` element can only have `li`, `script` or `template` elements as children.                                                                  |
| **Required direct parent**      | Warning  |     No     | Flags elements that have an invalid direct parent element. For instance, a `<li>` element can only be a child of `ul` or `ol` elements.                                                                                    |
| **Required element attribute**  | Warning  |     No     | Flags elements that are missing required attributes. For instance, an `<img>` element must have a `src` attribute.                                                                                                         |
| **Required meta tag**           | Warning  |     No     | Flags pages that have not declared a title or description meta tag.                                                                                                                                                        |
| **Invalid interactive content** | Warning  |     No     | Flags elements that are not allowed to include [interactive content elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Content_categories#interactive_content), but include one or more in their children. |
| **Image without dimension**     | Warning  |     No     | Flags `<img>` elements that do not have `width`, `height` or `aspect-ratio` attributes specified.                                                                                                                          |
| **Non-empty void elements**     | Warning  |     No     | Flags [void elements](https://developer.mozilla.org/en-US/docs/Glossary/Void_element) that have children declared.                                                                                                         |

## Logic

| Rule                          | Severity |           Auto fixes            | Description                                                                                                          |
| ----------------------------- | -------- | :-----------------------------: | -------------------------------------------------------------------------------------------------------------------- |
| **No static nodes**           | Warning  | Delete condition \| Delete node | Flags elements that have a `Show` formula, but where the formula always evaluates to `true` or `false`.              |
| **Unnecessary "And" formula** | Warning  |               No                | Finds `And` formulas where one of its conditions is always falsy. This means that the `And` formula is always falsy. |
| **Unnecessary "Or" formula**  | Warning  |               No                | Finds `Or` formulas where one of its conditions is always truthy. This means that the `Or` formula is always truthy. |

## Routing

## Miscellaneous
