---
title: Connecting data
description: Connect Nordcraft front-end websites to external data sources through APIs, with clear separation between visual interfaces and back-end systems.
---

# Connecting data

In Nordcraft, you can connect to any external data source through APIs. This allows your website to communicate with any external services, databases, and back ends.

Modern websites are typically divided into two parts:

1. **Front end (Nordcraft)**: The website running in the browser
2. **Back end**: Server-side systems handling data storage and business logic

Nordcraft is for front-end development. The front end and back end are fundamentally different parts of application architecture with distinct requirements, responsibilities, and security implications. Separating front-end and back-end concerns allows for more specialized tools in both areas, clearer separation of concerns, and greater choice in different technologies to power different parts of your websites.

## API layer

The API layer acts as the communication bridge between your Nordcraft front end and any back-end system:

- **Request/Response Protocol**: How your website communicates with back ends (usually HTTPS)
- **Data Formatting**: How information is structured throughout the request and response
- **Endpoints**: Specific URLs that provide access to back-end functionality
- **Authentication**: Security mechanisms to protect data and verify users
- **Error Handling**: How problems are communicated back to the front end

Using APIs in Nordcraft, you can fetch data from any data source and connect to any external services.

## Working with data in Nordcraft

The following pages in this section cover the specific aspects of working with external data:

- [Working with APIs](/connecting-data/working-with-apis): Setting up API endpoints
- [Call an API](/connecting-data/call-an-api): Triggering requests and using data
- [Authentication](/connecting-data/authentication): Securing data access
- [Streaming](/connecting-data/streaming): Working with real-time data
- [Advanced API features](/connecting-data/advanced-api-features): Additional configuration options
- [Services](/connecting-data/services): Connecting to specialized back-end providers
