---
title: How to keep your apps secure
description: Learn how to keep your Nordcraft front-end app secure by being mindful of exposing secret API credentials and other sensitive data.
---

# How to keep your Nordcraft app secure

Nordcraft is a front-end visual framework. As with any front-end application, all logic, configuration, and data, is visible to the user. Any information such as API keys, that should remain hidden from the user, should be stored in the back end and should not be included in your Nordcraft application.

This guide covers the key things you should know to keep your Nordcraft projects safe and secure, especially when working with APIs or any sensitive information.

## What does front-end framework mean?

Your Nordcraft applications run in the browser. There’s no back end, no secret layer, and nothing hidden from users. In front-end applications:

- Users can **investigate/access most things that make up your app**, including UI logic, network requests, and any data that powers your project, regardless of whether or not that data is shown on the page.
- As a result of this, you are unable to hide API keys or other sensitive credentials from your users in your Nordcraft apps.

:::info
For protected pages, users cannot access UI logic, network requests etc. unless they're authenticated. For unauthenticated users, they will instead be redirected by redirect rules from an API that you define in your project.
:::

## Do not store sensitive data in your Nordcraft projects

Because everything in your Nordcraft apps are visible to users in a browser, you should not store secrets or sensitive information in your Nordcraft projects.

Secrets or sensitive information can include, but are not limited to, the following:

- API keys that allow you to write data, such as content management keys provided by a CMS
- Back-end service credentials (like Supabase service roles)
- Secret tokens such as OAuth or JWTs tokens
- Private endpoints or anything involving sensitive user data

If you believe you have added any sensitive data or API credentials to your Nordcraft projects, remove them as soon as you can, generate new credentials, and delete the old ones.

:::info
Some API services provide **read-only** API keys to allow you to fetch data in a browser without compromising security. These types of keys are suitable to use in your Nordcraft applications. Always consult the relevant API service documentation to make sure you're using the correct read-only keys in your projects.
:::

## Use a back end to handle sensitive data and processes

If you need to work with APIs that require the use of sensitive credentials, or if you need to protect access to certain features, you'll need to use a separate back-end application.

Back-end applications can more securely:

- Store and manage API keys
- Configure user authentication and permissions
- Handle rate-limit usage and protect against abuse
- Proxy API requests, so that front-end applications do not have access to sensitive data such as API keys

## Security considerations

No matter the type of application you are building in Nordcraft, here are some security best practices to keep in mind:

### 1. Be mindful of what you include in the front end

Anything you include in your front-end applications can be accessed in a browser. When adding any new functionality to your projects, check whether any exposed data or credentials might compromise the security of your projects.

Even seemingly benign configurations like debug flags or API base URLs can help attackers understand your project setup, which may make it vulnerable to attack.

### 2. Handle authentication in a back-end application

If your Nordcraft application has users, logins, or restricted features:

- Handle sign-ins through your backend
- Use secure cookies or access tokens (preferably HTTP-only)
- Make sure every sensitive route checks permissions before you grant access

### 3. Be mindful of API usage

If your Nordcraft application communicates with APIs:

- Ensure your backend is rate-limiting requests
- Avoid exposing third-party APIs in the browser
- Monitor logs for abuse if your app starts to grow
