---
title: Recursive workflows
description: Implement counting, iteration and repetitive tasks with self-calling workflows that process arrays or count through values with break conditions.
---

# Recursive workflows

There are scenarios where you may need to iterate over a list of items and execute a workflow for each of those items. For these scenarios, you can create recursive workflows. A recursive workflow is a workflow that calls itself (conditionally). For example, for a countdown timer you could create a workflow that decreases a variable, waits for some time and then calls itself again until the target value of 0 is reached.

@@@ example
componentUrl: https://docs_examples.toddle.site/.toddle/custom-element/example-recursive-workflows.js
editorUrl: https://editor.nordcraft.com/projects/docs_examples/branches/main/components/example-recursive-workflows?rightpanel=style&canvas-width=1211&mode=design&canvas-height=800
height: 10rem

Click on the [kbd]Start[kbd] button to start the timer. It will count down to 0.
@@@

::: warning
Make sure you have a break condition, sleep timers or other measures in place so that the workflow does not call itself infinitely and cause an endless loop, which may cause a blue screen of death.
:::
