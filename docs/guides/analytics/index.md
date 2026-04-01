---
title: Analytics
description: Understand how to view your project analytics covering page requests, proxied API requests and custom element requests.
---

# Analytics

On all pricing plans, your Nordcraft projects are billed according to how many requests a project receives. You can monitor requests to your Nordcraft projects at an organization or project level.

## Request types

Requests to your Nordcraft projects can be one of three types:

| Request type            | Description                                                                                                                                                                                                                |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proxied API requests    | A page request, [redirect](/pages/redirects), or [proxy](/pages/proxies).                                                                                                                                                  |
| Proxied API requests    | An API request that is routed through Nordcraft's edge network. Find this setting in the advanced options in the API panel under fetching options > [proxy request](/connecting-data/advanced-api-features#proxy-request). |
| Custom element requests | A request for a [custom element (web component)](/components/export-a-component) exported from a Nordcraft project.                                                                                                        |

## Organization analytics

To view your organization requests, navigate to an organization, and select `Analytics` in the left sidebar.

![The organization view in Nordcraft, showing the analytics item highlighted in the menu in the left sidebar.|16/9](analytics-in-menu.webp 'Analytics')

You will see a graph showing requests to all of your projects over time.

![Analytics for an organization showing requests for all projects. This is a stacked line graph showing page requests in blue, proxied API requests in purple, and custom element requests in green. There is a total of over 1 million requests for the selected time period of the last 7 days.|16/9](analytics-org.webp 'Organization analytics')

You can use the filters at the top right of the graph to narrow down the request types you wish to view, or change the time period on the graph.

## Project analytics

To view requests for a single project, navigate to a project details page. Scroll down to find project requests underneath the list of currently active branches and version history.

![Analytics for a project. The project menu item is selected in the left sidebar showing that a project is selected. The requests graph is shown below the end of the version history list above. This is a stacked line graph showing page requests in blue, proxied API requests in purple, and custom element requests in green. There is a total of around 280000 requests for the selected time period of the last 7 days.|16/9](analytics-project.webp 'Project analytics')

You can use the filters at the top right of the graph to narrow down the request types you wish to view, or change the time period on the graph.
