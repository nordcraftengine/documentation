---
title: Supabase integration guide
description: Learn how to connect to the Supabase service to integrate your Supabase project into Nordcraft.
---

TO DO: OAUTH THING

# Supabase integration guide

To connect to Supabase:

1. Enter a name for the service (defaults to "Supabase")
2. Provide the following credentials:
   - **Project URL**: The URL of your Supabase project
   - **Anon public key**: The anonymous/public API key for your project

You can find these credentials in your Supabase project settings. Once the Supabase service is added, Nordcraft will validate the connection to ensure it can access the API documentation.

![The Supabase service dialog is open. The name of the service is Supabase and this is directly editable. In the setup section there below there are two input fields to paste a project URL and anon public key. These values can also be defined via formulas indicated by the fx buttons to the right of each input. Below the input fields there is a status message on current connectivity, with a check connection button that is currently disabled. At the bottom of the dialog there are two options indicated by icons to either delete the service or confirm the connection credentials.|16/9](configure-supabase-service.webp 'Configure Supabase service')

:::tip
To get up and running quickly with Supabase, including auth, realtime, and file uploads, install the [Supabase Connect](https://supabase_connect.nordcraft.site/) package in your project, or create a new website using the [Nordbase](https://nordbase.nordcraft.site) template, which is a pre-configured template that demonstrates all functionality of the Supabase Connect package.
:::

![The create a new project screen in Nordcraft, highlighting the Nordbase template, which is third in the basic list at the top of the template lists.|16/9](nordbase-template.webp 'Nordbase template')
