---
title: Xano integration guide
description: Learn how to integrate your Xano project into Nordcraft.
---

# Xano integration guide

To connect to Xano:

1. Enter a name for the service (defaults to "Xano")
2. Provide the **Base URL** for your Xano API

The Base URL can be found in your Xano workspace:

- Select **API** in the left menu
- Choose the API group you want to use
- Click the [kbd]Copy base URL[kbd] button in the top right corner

After the Xano service is added, Nordcraft checks the connection to confirm it can reach the API documentation.

![The Xano service dialog is open. The name of the service is Xano and this is directly editable. In the setup section there below there is one input field to paste a Xano base URL. Thus values can also be defined via a formula indicated by the fx button to the right of the input. Below the input field there is a status message on current connectivity, with a check connection button that is currently disabled. At the bottom of the dialog there are two options indicated by icons to either delete the service or confirm the connection credentials.|16/9](configure-xano-service.webp 'Configure Xano service')

::: warning
Nordcraft currently only supports public Xano API documentation. If your API documentation is private, you will need to make it public.
:::

To make your Xano API documentation public:

1. Go to your Xano API group
2. Click the [kbd]More options[kbd] button (three dots) in the top right
3. Select **Settings**
4. Change **Swagger (OpenAPI) Documentation** to **Public**
