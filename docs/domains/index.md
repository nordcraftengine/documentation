---
title: Domains
description: Understand how to use domains in Nordcraft to organize and manage different areas of your application effectively.
---

# Domains

Domains allow you to serve your Nordcraft application from different paths.
Each project will be created with 2 default domains (these domains are permanent and cannot be deleted):

- `{project-name}.toddle.site` - Default production domain
- `main-{project-name}.toddle.site` - Each branch has a unique domain in the format `{branch-name}-{project-name}.toddle.site`.

To see the list of domains registered on your project, go to the Project Overview page and click on the **Edit domain** button to the left of the Project URL.

On the Domain Management page, you can see all the domains registered on your project. You can also add new domains from this page as well as edit and delete them.
On each domain you will see its current status:

- **Active**: The domain is properly configured and pointing to your Nordcraft project.
- **Pending**: The domain has been added but is not yet properly configured. Follow the instructions provided to complete the setup. Note that DNS changes can take up to 48 hours to propagate.

## Adding domains

New domains are added from the Domain management page.

1. Fill in the domain name in the form at the bottom of this page and click **Add domain**.
2. The domain will be added to the list of domains with a status of **Pending**.
3. Under the domain you will see instructions on how to configure your DNS settings to point the domain to your Nordcraft project.
4. You can chose to add either an **A**-record or a **CNAME**-record depending on your DNS provider's capabilities. The record name and value will be provided in the instructions.

::: info
Adding new domains are only available on paid plans. Projects in organizations on the free plan will be served on `{project-name}.toddle.site`.
:::

## Adding wildcard domains

Wildcard domains allow you to serve your Nordcraft application from any subdomain of a given domain.
For example, if you add the wildcard domain `*.example.com`, your Nordcraft application will be accessible from any subdomain of `example.com`, such as `app.example.com`, `blog.example.com`, or `shop.example.com`.
To add a wildcard domain, follow the same steps as adding a non-wildcard domain, but use the wildcard format (e.g., `*.example.com`) when entering the domain name.

1. Fill in the domain name in the form at the bottom of this page and click **Add domain**. Remember to prepend the domain with `*.` to indicate it's a wildcard domain.
2. The domain will be added to the list of domains with a status of **Pending**.
3. Under the domain you will see instructions on how to configure your DNS settings to point the domain to your Nordcraft project.
4. Wildcard domains must be added using a **CNAME**-record. The record name and value will be provided in the instructions.
5. In addition to the CNAME-record for the wildcard domain, you will also need to add an additional **CNAME**-record that allows Nordcraft to automatically issue and renew SSL certificates for your wildcard domain. The record name and value for this additional CNAME record will also be provided in the instructions.
6. Lastly you will need to add a **TXT**-record to verify domain ownership. The record name and value will be provided in the instructions.

::: info
Adding wildcard domains are only available on scaleup plans. Projects in organizations on lower plans will not be able to add wildcard domains.
:::
