---
title: Configure proxies
description: Learn how to set up up a proxy in Nordcraft to serve content from different domains, or serve utility files like sitemaps or robots.txt files.
---

# Configure proxies

You can use proxies to map one URL to another URL. Using a proxy hides the path of the destination on the server, so that it appears that the location does not change.

You may want to use proxies to serve content from domains that are no longer in use, but where the content is still relevant. You may also want to use proxies to serve utility content like sitemap.xml files, robot.txt files, and ads.txt files.

Proxies are listed in the [project sidebar](/the-editor/project-sidebar) in the **Pages** section.

Create a proxy by clicking the [kbd]+[kbd] button in the **Pages** section header, and select the **Proxy** tab. You will then see configuration options divided into two main sections:

## Source

The source section defines the URL address that will proxy to another page. In this section you can also configure the URL to include path and query parameters.

### Source: path

- Add path segments by clicking the [kbd]+[kbd] button
- Provide a name for each path segment
- Enable the [kbd]Param[kbd] checkbox to make a path dynamic
  - Set a test value for development purposes
- Remove paths using the [kbd]-[kbd] button

### Source: query

- Add query parameters by clicking the [kbd]+[kbd] button
- Provide a name for each query segment
  - Set a test value for development purposes
- Remove parameters using the [kbd]-[kbd] button

::: tip
For more information about URL structure, check out the [blog post about URLs](https://blog.nordcraft.com/urls-how-do-they-really-work).
:::

## Proxy

Use the **Proxy** section to define the URL that will be the target of the proxy, which you can configure using path and query parameters. In this section you can also see a live preview of the content served by the redirect URL. The type of preview is determined by the content type of the URL. JSON content is displayed in a tree structure, and HTML content is displayed in an iframe.

### URL

Define the URL you wish to proxy. Type or paste a complete URL including path, query, or hash parameters into the input field, and Nordcraft will arrange it properly given the sections are not already filled.

### Destination: path

- Add path segments by clicking the [kbd]+[kbd] button
- Provide a name for each path segment
- Remove paths using the [kbd]-[kbd] button

### Destination: query

- Add query parameters by clicking the [kbd]Add query[kbd] button
- Provide a name and a value for each query segment
- Remove parameters using the [kbd]-[kbd] button

## Testing

In order to verify that your proxy works as intended, click the "Preview page in new tab", or navigate to the URL that you have set up in the source section. If the proxy is configured correctly, you should see the desired location.

::: info
Proxies are only available on paid plans.
:::
