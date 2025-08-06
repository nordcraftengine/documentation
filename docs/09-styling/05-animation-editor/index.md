---
title: Animation editor
description: Bring joy and delight to your apps by using the Nordcraft animation editor to generate CSS animations in an intuitive visual interface.
---

# Animation editor

Using the animation editor in Nordcraft, you can create and manage animations for your components. You can define keyframes and set animation properties such as duration, delay, and easing functions.

Animations are rendered to the DOM as pure CSS animations, which means the resulting code is lean and performant, and can be used in any web project without additional dependencies. Your animations created with the Nordcraft animation editor and will run smoothly across all modern browsers.

## Creating animations

To create an animation:

1. Select an element in the [element panel](/the-editor/element-panel)
2. View the style panel, and locate the **Animations** section in the style panel
3. Click the [kbd]+[kbd] button next to **Animations** to open the animation editor
4. Choose from one of the preset animation templates available in the editor, or start by adding your own keyframes

## Keyframes

Keyframes define the stages of an animation. Keyframes specify what should change at specific points in time during the animation. To add a keyframe, click the [kbd]♦[kbd] button next to the CSS property in the animation editor timeline, or click the [kbd]♦[kbd] next to the CSS property in the style panel when the animation editor is visible.

:::tip
Learn more about [CSS keyframes on the official MDN documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes).
:::

## Animation properties

In the bottom bar of the animation editor, you can set various properties for your animation. Properties specify how animations behave, while keyframes define what changes. Properties include:

- **Duration**: The total time the animation takes to complete.
- **Delay**: The time before the animation starts. Setting a negative delay will cause the animation to start immediately, but at a specific point in time, effectively skipping the initial frames.
- **Easing**: The timing function that controls the speed of the animation at different points. You can choose from predefined easing functions or create a custom one.
- **Iteration count**: How many times the animation should repeat. You can set it to a specific number or use `infinite` for continuous animations.
- **Direction**: The direction in which the animation plays. Options include `normal`, `reverse`, `alternate`, and `alternate-reverse`.
- **Fill mode**: Determines how the animation applies styles to its target before and after it is executing. Options include `none`, `forwards`, `backwards`, and `both`.

::: tip
You can control an animation's exact time by binding a negative delay to a variable. This allows you to start the animation at a specific point in time, effectively skipping the initial frames.
:::

## Using animations

Once you have created an animation, it will automatically play when the style is applied to the element. If the animation is set to loop, it will continue to play indefinitely. You can control when the animation plays by adding the animation to a specific selector, such as `:hover`, `:focus`, or when a class is added to the element.

::: info
You can inspect the animation keyframe data by opening the CSS panel in the style panel. Notice how the auto-generated name of the animation maps to the `@keyframes` rule defined in CSS.
:::

## Composing animations

You can apply multiple animations to elements in the style panel, and they will play in sequence or simultaneously, depending on their properties. Creating complex animations often involves combining multiple animations and multiple elements within other elements to make one cohesive animation.

:::info
Transforms are one of the most powerful tools in CSS animations, allowing you to manipulate elements in 2D and 3D space. Transforms can be used to scale, rotate, translate, and skew elements, providing a wide range of creative possibilities. Use `transform-offset` to make an element rotate or scale around a specific point, rather than its center. In the example below, this is used to make the duck's beak open and close around the point where it connects to the head instead of its center like a pair of scissors would.
:::

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-duck.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-duck?canvas-width=800&canvas-height=290.5&rightpanel=style
height: 18rem

To make this duck move naturally, each section is animated separately, and the logical hierarchy of the elements is used to make sure that the eyes move together with the head, and the head moves together with the body, etc.
@@@

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-like-button.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-like-button?canvas-width=800&rightpanel=style&canvas-height=290
height: 23rem

Click the heart to see different animations based on the component's state. The like animation composes two animations together on the large heart, and the unlike animation shows a single different animation.
@@@

Check out the video below to see how the like button was built.

@@@ youtube
videoId: oO_hNhzLOmM
title: How to build The Best Like Button™️ on The Internet
@@@
