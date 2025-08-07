---
title: Connecting data
description: Connect Nordcraft front-end applications to external data sources through APIs, with clear separation between visual interfaces and back-end systems.
---

# Connecting data

In Nordcraft, you can connect to any external data source through APIs. This allows your application to communicate with any external services, databases, and back ends.

Modern web applications are typically divided into two parts:

1. **Front end (Nordcraft)**: The user interface running in the browser
2. **Back end**: Server-side systems handling data storage and business logic

This separation allows each part to focus on specific responsibilities, creating more maintainable and scalable applications.

## Why Nordcraft focuses on the front end

Nordcraft focuses on visual front-end development. The front end and back end are fundamentally different parts of application architecture with distinct requirements, responsibilities, and security implications. Separating front-end and back-end concerns allows for more specialized tools in both areas.

This front-end-focused approach offers several advantages for developers and teams:

- **Specialized tooling**: Optimized tooling for visual development without back-end compromises
- **Simplified development**: Clearer separation of concerns leads to more manageable projects
- **Back-end flexibility**: Connect to any back-end system that meets your requirements
- **Technical independence**: Teams can choose back-end technologies based on their expertise or requirements

## API layer

The API layer acts as the communication bridge between your Nordcraft front end and any back-end system:

- **Request/Response Protocol**: How your application communicates with back ends (usually HTTPS)
- **Data Formatting**: How information is structured throughout the request and response
- **Endpoints**: Specific URLs that provide access to back-end functionality
- **Authentication**: Security mechanisms to protect data and verify users
- **Error Handling**: How problems are communicated back to the front end

Through Nordcraft's API capabilities, your application can perform tasks like retrieving data, saving state, authenticating users and connecting to services.

## Working with data in Nordcraft

The following pages in this section cover the specific aspects of working with external data:

- [Working with APIs](/connecting-data/working-with-apis): Setting up API endpoints
- [Call an API](/connecting-data/call-an-api): Triggering requests and using data
- [Authentication](/connecting-data/authentication): Securing data access
- [Streaming](/connecting-data/streaming): Working with real-time data
- [Advanced API features](/connecting-data/advanced-api-features): Additional configuration options
- [Services](/connecting-data/services): Connecting to specialized back-end providers

::: tip
For more information about the philosophy behind this separation of concerns, check out the blog post [One Size Does Not Fit All](https://blog.nordcraft.com/one-size-does-not-fit-all).
:::
