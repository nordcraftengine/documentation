---
title: Working with APIs
description: Connect API endpoints in Nordcraft with custom methods, URLs, headers, and payloads to send and receive external data.
---

# Working with APIs

APIs are the primary way to connect your Nordcraft application to external data sources. They enable communication between your front-end application and back-end services, allowing you to fetch, send and manipulate data.

Nordcraft supports any API and has a dedicated GraphQL explorer for working with GraphQL APIs.

## Connect a new API

![The attributes panel is visible to the right of the editor. One API is in the API section list, named Weather API. The add new API dialog is visible, indicating the plus button next to APIs has been clicked. The connect new API dialog shows options for pasting a new API URL, connecting a new service, or choosing from one of the API templates, including a REST API, GraphQL and file upload template. The dialog also shows the option for adding two demo APIs, the weather API and the Owen Wilson wow API. The image is annotated according to the list items below.|16/9](set-up-an-api.webp 'Connect a new API')

To create a new API connection in Nordcraft:

1. Select the component or page where you want to add the API
2. With no element selected, go to the **APIs** section of the [data panel](/the-editor/data-panel) and click the [kbd]+[kbd] button
3. You will see the **Connect new API** panel with several options:
   **(A)** Enter a URL directly to create a custom API
   **(B)** Choose from connected services to access predefined endpoints (see [Services](/connecting-data/services))
   **(C)** Select from available templates to set up common APIs
   **(D)** Choose a Demo API

For beginners, the **Demo APIs** provide an excellent starting point to understand how APIs work in Nordcraft.

::: tip
Read our blog post on [REST APIs](https://blog.nordcraft.com/rest-apis-explained) if you're new to working with APIs.
:::

## Configure API requests

![The edit API dialog is open. Auto fetch is enabled, the HTTP method is GET, the name of the API is Weather API. A tabbed area contains configuration for inputs, URL, parameters, headers, events and advanced. The currently selected tab is URL, which reveals two path parts for the API URL below. At the bottom of the dialog is the response data from the API, showing a JSON object represented in collapsible sections using small arrow icons. If a section is collapsed, the arrow icon is pointing right. If a section is expanded, the arrow is pointing down. The image is annotated according to the list items below.|16/9](configure-api-requests.webp 'Configure API requests')

After connecting an API, you will see the configuration panel with the following sections:

1. **Method**: Select the appropriate [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) (`GET`, `POST`, `PUT`, `DELETE`, etc.)
2. **Name**: Give the API a descriptive name
3. **Configuration tabs**:
   - **Inputs**: Default values used when fetching data that can be overwritten when called from workflows
   - **URL**: Configure the base URL and path
   - **Parameters**: Configure query parameters
   - **Headers**: Set request headers for authentication, content type, etc.
   - **Body**: Define the request body for methods that support it (this tab is only visible for supported methods)
   - **Events**: Define workflows for `On success`, `On error` and `On message` events
   - **Advanced**: Access additional configuration options
4. **Response section**: View the latest response from the server
5. **Auto fetch toggle**: Control when the API automatically retrieves data

### Configure the request URL

Configure the endpoint URL to specify where your request should be sent.

![The edit API dialog is open. The currently selected tab is URL, which reveals two path parts for the API URL below. At the bottom of the dialog is the response data from the API, showing a JSON object represented in collapsible sections using small arrow icons. If a section is collapsed, the arrow icon is pointing right. If a section is expanded, the arrow is pointing down. The image is annotated according to the list items below.|16/9](configure-a-request-url.webp 'Configure a request URL')

The **URL** and **Parameters** tabs allow you to construct the complete request URL by configuring:

1. **Base URL**: the domain and protocol (e.g. `https://api.example.com`)
2. **Path**: the specific endpoint path (e.g. `/users/profile`)
3. **Query parameters** (in **Parameters** tab): key-value pairs that appear after `?` in the URL
   - query parameters refine the response without changing the endpoint path
   - parameters with `null` values are skipped

::: tip
For a detailed explanation of URL structure, read our blog post about [how URLs really work](https://blog.nordcraft.com/urls-how-do-they-really-work).
:::

### Set request headers

[HTTP request headers](https://developer.mozilla.org/en-US/docs/Web/API/Request/headers) provide additional information about the request that determine how the back-end server processes the API call.

![The edit API dialog is open. The currently selected tab is Headers, which reveals a single header named authorization, with value of bearer cookies.access_token, surrounded by double curly braces, which has been generated via a formula, indicated by the blue fx button next to the field. At the bottom of the dialog is the response data from the API, showing a JSON object. The image is annotated according to the list items below.|16/9](set-a-request-header.webp 'Set a request header')

To add a request header:

1. In the **Headers** tab, click the [kbd]+[kbd] button
2. Select or enter the header name:
   - `Content-Type`: Format of the request body (e.g. `application/json`)
   - `Accept`: Expected format of the response (e.g. `application/json`)
   - `Authorization`: Authentication credentials (e.g. `Bearer {{ cookies.access_token }}`)
   - `Cache-Control`: Caching directives (e.g. `no-cache`)
   - `X-Api-Key`: API key for authentication
   - `Accept-Language`: Preferred language for response
   - Type in any value and confirm with [kbd]Enter[kbd] for other headers
3. Provide a static value or click [kbd]fx[kbd] for dynamic values

::: info
The documentation for your particular back-end API will provide information on what HTTP request headers it accepts for each URL endpoint.
:::

### Configure the request body

Define the data to send in the request [body](https://developer.mozilla.org/en-US/docs/Web/API/Request/body) when the method supports it, such as `POST`, `PUT`, or `PATCH`.

![The edit API dialog is open. The currently selected tab is Body, which reveals a single field named body, with value of property, surrounded by single curly braces, which has been generated via a formula, indicated by the blue fx button next to the field. Below, the formula editor is open, demonstrating how the body value has been generated using an Object creation node. The image is annotated according to the list items below.|16/9](set-a-request-body.webp 'Set a request body')

To configure the body:

1. Ensure your method supports a request body
2. Navigate to the **Body** tab
3. Use the formula editor to define the data structure

::: dev
By default, the request body will be encoded as JSON unless you specify a different format using the [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type) header.
:::

### Auto fetch behavior

The auto fetch feature automatically triggers API requests based on certain conditions:

- When enabled, the API will fetch data when the component or page loads
- The API will automatically refetch when any formula values used in the request change
- This behavior can be controlled with a formula to create conditional fetching logic

Auto fetch is especially useful for `HTTP GET` requests where you want to display data immediately and keep it updated when related parameters change. Additionally, it enables server-side rendering (SSR) if configured in the **Advanced** tab.

### Test API requests

![The edit API dialog is open. The currently selected tab is URL. This image highlights the play button to the top right of the JSON response panel, which when clicked, performs the API call. The image is annotated according to the list items below.|16/9](test-an-api-request.webp 'Test an API request')

You can test your API directly in the editor:

1. For APIs with `Auto fetch` disabled, click the [kbd]Play[kbd] button to manually trigger the request
2. View the response in the **Response** section at the bottom of the API panel
3. Check the HTTP status code, response headers and body to ensure the API is working as expected
4. Check the returned data to ensure the API provides the correct information

The response section will display the data returned from the API, including properly formatted JSON if that is the response format.

## GraphQL explorer

Nordcraft provides a GraphQL explorer for you to build GraphQL queries. After connecting a GraphQL API, click on the `Add field` button to start building your query.

![The edit API dialog is open for a GraphQL API connection. A button named Add Field is highlighted with a white border to the right of the API connection details.|16/9](graphql-add-field.webp 'Add a field to a GraphQL query')

After you've added your first field, you'll see the GraphQL explorer open on the left of the API dialog so you can further refine your query. Click the [kbd]+[kbd] buttons to add fields to your query, and click the checkmarks next to the fields to remove them from your query. Watch the API response update in real time when the [auto-fetch](/connecting-data/call-an-api#using-auto-fetch) toggle is on.

![The GraphQL explorer is showing a query constructed on the blogPostCollection entity, with the fields category, date and slug selected under items. The API response panel on the right is showing the data fetched by the query.|16/9](graphql-built-query.webp 'Add a field to a GraphQL query')

### Add a GraphQL query variable

The GraphQL explorer supports GraphQL query variables, allowing you to build your queries with dynamic data. To add a GraphQL query variable:

![The GraphQL explorer is annotated to match the list items below. It shows a small dialog on an author field with an ID pasted into the input. Below there is a button to create variable, which is highlighted with a white border.|16/9](graphql-create-variable.webp 'Add a variable to a GraphQL query')

1. Click on the cog wheel icon next to a field that supports a GraphQL variable.
2. Add a variable value in two ways:
   **(A)** Paste in a hard-coded value
   **(B)** Click `Create variable` for more options and flexibility

When you create a GraphQL query variable, you can view and edit the variable in the variables tab of the GraphQL explorer. You can also use a formula to power the variable value using the formula editor.

![The formula editor is open, showing that the value of the author ID variable is being powered by a project formula defined at the project level.|16/9](graphql-variable-formula-editor.webp 'Add a variable to a GraphQL query')

:::tip
When you add a GraphQL query variable using `Create variable`, give it a descriptive name such as `author_id`.
:::

## Next steps

After setting up your API:

- [Call the API](/connecting-data/call-an-api) in response to user actions
- [Access API data](/connecting-data/call-an-api#accessing-api-data) in your components
- Configure [authentication](/connecting-data/authentication) for secure data access
- Explore [advanced features](/connecting-data/advanced-api-features) for specialized requirements
