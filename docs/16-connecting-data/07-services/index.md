---
title: Services
description: Connect to back-end providers like Supabase, Xano or OpenAPI-compliant services to automatically configure API endpoints in your Nordcraft project.
---

# Services

Services in Nordcraft simplify working with APIs by automatically retrieving endpoint details from back-end providers. When you create a service connection, Nordcraft pre-fills the necessary information for new APIs, reducing setup time and minimizing configuration errors.

Nordcraft supports connections to a variety of back-end services:

- **Supabase**: Open-source Postgres database with authentication and real-time capabilities
- **Xano**: No-code database and API builder
- **OpenAPI**: Any service using the [OpenAPI Specification](https://swagger.io/resources/open-api) (v2 and v3)

## Add a service

You can add services in Nordcraft in two ways.

### From the API creation flow

![Add a service from API panel|16/9](add-a-service-from-api-panel.webp)

1. When creating a new API, click the [kbd]Connect new[kbd] button
2. Select the service you want to connect to from the available options

### From the project sidebar

![Add a service from project sidebar|16/9](add-a-service-from-project-sidebar.webp)

1. Open the [project sidebar](/the-editor/project-sidebar) by clicking the folder icon or using [kbd]Cmd/Ctrl[kbd] + [kbd]K[kbd]
2. Navigate to the **Services** section and click the [kbd]+[kbd] button to add a new service
3. Select your desired service

## Configure specific services

### Supabase

![Configure Supabase service|16/9](configure-supabase-service.webp)

To connect to Supabase:

1. Enter a name for the service (defaults to "Supabase")
2. Provide the following credentials:
   - **Project URL**: The URL of your Supabase project
   - **Anon public key**: The anonymous/public API key for your project

You can find these credentials in your Supabase project settings. Once the Supabase service is added, Nordcraft will validate the connection to ensure it can access the API documentation.

::: tip
To reuse API and service configuration values throughout your project, click the [kbd]Make Global formula[kbd] button next to a field. This creates a [global formula](/formulas/global-formulas) that can be referenced anywhere else.
:::

### Xano

![Configure Xano service|16/9](configure-xano-service.webp)

To connect to Xano:

1. Enter a name for the service (defaults to "Xano")
2. Provide the **Base URL** for your Xano API

The Base URL can be found in your Xano workspace:

- Select **API** in the left menu
- Choose the API group you want to use
- Click the [kbd]Copy base URL[kbd] button in the top right corner

After the Xano service is added, Nordcraft checks the connection to confirm it can reach the API documentation.

::: warning
Nordcraft currently only supports public Xano API documentation. If your API documentation is private, you will need to make it public.
:::

To make your Xano API documentation public:

1. Go to your Xano API group
2. Click the [kbd]More options[kbd] button (three dots) in the top right
3. Select **Settings**
4. Change **Swagger (OpenAPI) Documentation** to **Public**

### Custom service (OpenAPI)

![Configure custom service|16/9](configure-custom-service.webp)

For services not natively supported by Nordcraft, you can add a custom service using **OpenAPI** specification:

1. Enter a name for the service (defaults to "Custom")
2. Configure the following:
   - **Base URL**: The root URL that will be applied to all paths in the service
   - **Docs URL**: The URL to the OpenAPI JSON Specification file of the service

Nordcraft performs a check after setup to confirm the API documentation is accessible.

::: info
Nordcraft currently supports [OpenAPI Specification](https://swagger.io/resources/open-api/) versions 2 and 3.
:::

## Use a service in an API

Once your services are configured, the API creation process becomes simplified by providing pre-defined endpoints from your back end:

1. When creating a new API, you will see your connected services
2. Choose the endpoint from the available options of your selected service
3. Nordcraft automatically pre-fills all request details (`path`, `headers`, `parameters`, `body`)
4. Adjust specific values as needed for your implementation

This approach streamlines API creation by leveraging the schema information already defined in your back-end service.

## Benefits of services

Connecting to services offers several advantages:

- **Reduced configuration time**: Automatically populate API endpoints with correct paths and parameters
- **Consistency**: Ensure proper formatting for requests based on the service's documentation
- **Discovery**: Easily browse available endpoints without referring to external documentation
- **Maintainability**: When your back-end service changes, you can update the connection in one place to be applied across all related APIs

::: info
Services help bridge the gap between front-end and back-end development, making it easier to maintain a clean separation of concerns while ensuring proper integration.
:::
