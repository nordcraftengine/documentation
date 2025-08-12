---
title: Configure redirects
description: Learn how to set up permanent or temporary redirects in Nordcraft to redirect users from one site URL to another.
---

# Configure redirects

You can use redirects to redirect or forward one URL to another. When a URL that is targeted for redirection is requested, the server will respond with a redirect response, which includes a specific redirect HTTP status code as well as a URL to navigate to. When a browser receives a redirect response, it will navigate to the URL provided.

Redirects can be permanent or temporary. You may want to use permanent redirects to handle typos or synonyms in URLS, or to protect against broken links when moving to a new domain. You may want to use temporary redirects to keep links operational and discoverable during site maintenance.

Redirects are listed in the [project sidebar](/the-editor/project-sidebar) in the **Pages** section.

Create a redirect by clicking the [kbd]+[kbd] button in the **Pages** section header, and select the **Redirect** tab. You will then see configuration options divided into two main sections:

## Source

The source section defines the URL address that will redirect to another page. In this section you can also configure the URL to include path and query parameters.

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

## Redirect to

Use the **Redirect to** section to define the URL that will be the target of the redirect, which you can configure using path and query parameters. In this section you can also see a live preview of the content served by the redirect URL. The type of preview is determined by the content type of the URL. JSON content is displayed in a tree structure, and HTML content is displayed in an iframe.

### Enable and disable the redirect rule

Use the **Enabled** toggle to enable or disable the redirect. You can also conditionally enable or disable the redirect using the [kbd]fx[kbd] button.

- You could plan redirects to be enabled after a given date, or during a certain campaign period
- You could make sure that redirects are only active if a user has a certain language setting or a cookie present
- You could serve a fallback page for the same source url if a redirect was not enabled for a given request

### Status code

Set the HTTP status code of the redirect. A redirect can be either temporary or permanent, and respond with the appropriate HTTP status code. The supported status codes include:

- 301 Moved permanently
- 302 Found
- 307 Temporary redirect
- 308 Permanent redirect

::: tip
Check out the [MDN documentation on redirections](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Redirections) for more information about using HTTP status codes with redirects.
:::

### URL

Here is where you define the URL you wish to redirect to. Type or paste a complete URL including path, query or hash parameters into the input field, and Nordcraft will arrange it properly given the sections are not already filled.

### Destination: path

- Add path segments by clicking the [kbd]+[kbd] button
- Provide a name for each path segment
- Remove paths using the [kbd]-[kbd] button

### Destination: query

- Add query parameters by clicking the [kbd]+[kbd] button
- Provide a name and a value for each query segment
- Remove parameters using the [kbd]-[kbd] button

### Hash

Set the hash of the redirect. This can be used to target a specific fragment of the URL, such as a section of the page.

## Testing

In order to verify that your redirect works as intended, click the "Preview page in new tab", or navigate to the URL that you have set up in the source section. If the redirect is configured correctly, you should be redirected to the desired location.

To make it easier to test redirects, you can see the name of your redirect rule in the HTTP response headers. Look for the [`X-Nordcraft-Redirect-Name` header](https://github.com/nordcraftengine/nordcraft/blob/main/packages/ssr/src/utils/headers.ts#L20) in the response section of your browser's network tab (under developer tools). This can help you identify which redirect rule was triggered in situations where you have multiple redirects set up.

::: info
Redirects are only available on paid plans.
:::
