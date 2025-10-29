---
title: Custom domains
description: Learn how to add custom domains to your Nordcraft project to serve your application from different public-facing URLs.
---

# Custom domains

You can add custom domains in Nordcraft to allow you to serve your Nordcraft project from different domains, or URLs. Each project will be created with two default domains; these domains are permanent and cannot be deleted:

- `{project-name}.toddle.site`: default production domain
- `main-{project-name}.toddle.site`: each branch has a unique domain in the format `{branch-name}-{project-name}.toddle.site`. This is a publicly accessibly URL that you can use to view work in progress in a browser, and share it with people for sign off and approval of new features and functionality.

To see the list of domains registered on your project, go to the Project Overview page and click on the **Edit domain** button to the left of the Project URL.

![The Project Overview page, showing the Edit Domain button is visible next to the current public project URL.|16/9](edit-domain.webp 'Edit domain button')

On the Domain Management page, you can see all the domains registered on your project. You can also add, edit and delete domains.

Next to each domain you will see its current status:

- **Active**: The domain is properly configured and pointing to your Nordcraft project.
- **Pending**: The domain has been added but is not yet properly configured. Follow the instructions provided to complete this configuration.

:::tip
Don't worry if you don't see your domain changes move to the **Active** status straight away. DNS changes can take up to 48 hours to take effect.
:::

## Add a domain

You can add new domains on the Domain Management page. Enter the domain name and click **Add domain**.

![The Domain Management page is shown with 3 active domains. The add domain input field has been filled with test-domain.com. The add domain button is next to the input field.|16/9](add-domain.webp 'Add domain')

After adding a new domain, you'll see the domain added to the list of domains with a status of **Pending**.

![The new domain has been added with a status of pending. The configuration instructions are provided with some relevant information about CNAME and A records. The A record tab is highlighted, showing the A record name and value to be added to the DNS provider.|16/9](create-domain.webp 'Configure domain')

- Under the domain you will see instructions on how to configure your DNS settings to point the domain to your Nordcraft project
- You can chose to add either an **A** or **CNAME** record depending on your DNS provider's capabilities; the record name and value you need to set in your DNS provider is provided for you by Nordcraft

::: info
Custom domains are only available on paid plans. Projects in organizations on the free plan will be served on `{project-name}.toddle.site`.
:::

## Wildcard domains

Wildcard domains allow you to serve your Nordcraft application from any subdomain of a given domain.

For example, if you add the wildcard domain `*.example.com`, your Nordcraft application will be accessible from any subdomain of `example.com`, such as `app.example.com`, `blog.example.com`, or `shop.example.com`.

To add a wildcard domain, follow the same steps as adding a non-wildcard domain, but use the wildcard format (e.g. `*.example.com`) when entering the domain name.

![The Domain Management page is shown with a new wildcard domain added that has a status of pending. The configuration instructions are provided with some relevant information about CNAME and A records. The CNAME record tab is highlighted, and the A record tab is disabled. Below there are CNAME records and the TXT record provided to add to your DNS provider.|16/9](create-wildcard-domain.webp 'Add a wildcard domain')

- Under the domain you will see instructions on how to configure your DNS settings to point the domain to your Nordcraft project
- You must add a wildcard domains using a **CNAME** record
- In addition to the **CNAME** record for the wildcard domain, add an additional **CNAME** record that allows Nordcraft to automatically issue and renew SSL certificates for your wildcard domain
- Finally, add the provided **TXT** record to your DNS provider to verify domain ownership

::: info
Wildcard domains are only available on Scaleup plans.
:::
