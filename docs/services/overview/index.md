---
title: Services
description: Connect to back-end providers like Supabase, Xano or OpenAPI-compliant services to automatically configure API endpoints in your Nordcraft project.
---

# Services

You can use services in Nordcraft to simplify working with APIs. When you add a service connection, Nordcraft automatically retrieves endpoint details from back-end providers, pre-filling the necessary information for new APIs, reducing setup time and minimizing configuration errors.

Nordcraft supports service connections to a variety of back-end providers. Click on the cards below to view a detailed integration guide.

@@@ service
name: DatoCMS
dataType: CMS
supportedApis: GraphQL
description: A user-friendly and performant headless CMS.
slug: datocms
logoUrl: https://github.com/datocms.png
@@@

@@@ service
name: Contentful
dataType: CMS
supportedApis: GraphQL
description: A headless content platform with personalization and analytics.
slug: contentful
logoUrl: https://github.com/contentful.png
@@@

@@@ service
name: Supabase
dataType: Database
supportedApis: GraphQL, REST
description: Open-source Postgres database with authentication and real-time capabilities.
slug: supabase
logoUrl: https://github.com/supabase.png
@@@

@@@ service
name: Umbraco
dataType: CMS
supportedApis: GraphQL
description: Flexible open-source .NET content management system.
slug: umbraco
logoUrl: https://github.com/umbraco.png
@@@

@@@ service
name: Xano
dataType: Database
supportedApis: REST
description: No-code database and API builder.
slug: xano
logoUrl: https://github.com/xano-inc.png
@@@

## Add a service

You can add services in Nordcraft in two ways.

### From the API creation flow

![The add new API dialog is open. In the services section, the connect now button is highlighted. To the left of this, another part of the Nordcraft editor has been spliced onto the image, showing three available pre-configured services available to add: Supabase, Xano and OpenAPI.|16/9](add-a-service-from-api-panel.webp 'Add a service from API panel')

1. When creating a new API, click the [kbd]Connect new[kbd] button
2. Select the service you want to connect to from the available options

### From the project sidebar

![The project sidebar is visible to the left of the editor, showing the plus button next to the services list. The plus button has been clicked, which shows a new dialog listing three available pre-configured services available to add: Supabase, Xano and OpenAPI.|16/9](add-a-service-from-project-sidebar.webp 'Add a service from project sidebar')

1. Open the [project sidebar](/the-editor/project-sidebar) by clicking the folder icon or using [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd]
2. Navigate to the **Services** section and click the [kbd]+[kbd] button to add a new service
3. Select your desired service

### Configure a custom service (OpenAPI)

For services not natively supported by Nordcraft, you can add a custom service using the [OpenAPI Specification](https://swagger.io/resources/open-api):

1. Enter a name for the service (defaults to "Custom")
2. Configure the following:
   - **Base URL**: The root URL that will be applied to all paths in the service
   - **Docs URL**: The URL to the OpenAPI JSON Specification file of the service

Nordcraft performs a check after setup to confirm the API documentation is accessible.

![The OpenAPI service dialog is open. The name of the service is Custom and this is directly editable. In the setup section there below there are two input fields to paste a base URL and a docs URL. These values can also be defined via formulas indicated by the fx buttons to the right of each input. Below the input fields there is a status message on current connectivity, with a check connection button that is currently disabled. At the bottom of the dialog there are two options indicated by icons to either delete the service or confirm the connection credentials.|16/9](configure-custom-service.webp 'Configure custom service')

::: info
Nordcraft currently supports [OpenAPI Specification](https://swagger.io/resources/open-api/) versions 2 and 3.
:::

## Use a service in an API

Once your services are configured, you can coose pre-defined endpoints from your back-end provider.

1. When creating a new API, you will see your connected services
2. Choose the endpoint from the available options of your selected service
3. Nordcraft automatically pre-fills all request details: `path`, `headers`, `parameters`, `body`
4. Adjust specific values as needed

::: tip
To reuse API and service configuration values throughout your project, click the [kbd]fx[kbd] button next to a field. This creates a [project formula](/formulas/project-formulas) that can be referenced anywhere else.
:::

## Editing service endpoints

When you create a new API via a service connection, Nordcraft automatically pre-fills the necessary information for that new API, including the URL path. When you create an API via a service connection, you may encounter a situation where you need to change the URL path of an API.

Currently, is not possible to edit the URL path of an API linked to a service to point to a different service endpoint. However, to save you creating a brand new API, you can choose to detach the API from the service, which allows you to edit any part of the API connection. Click on the three dot menu to the top right of the API panel and click `Detach service`.

![The API panel is open. A DatoCMS service is connected. The three dot menu at the top right of the API panel has been clicked, revealing a menu with one option to click: detach service.|16/9](detach-service.webp 'Detach service')
