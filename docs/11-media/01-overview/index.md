---
title: Media management
description: Learn how to upload images for use in your Nordcraft project, and how to generate URLs for differently sized images.
---

# Media management

You can upload images to your Nordcraft projects for use in your applications. Uploaded images are served from Nordcraft's Content Delivery Network (CDN).

## Upload images

To upload an image, find the **Media** section in the [project sidebar](/the-editor/project-sidebar) and click the upload icon to select an image file from your computer.

Supported image types include:

1. JPEG
1. PNG
1. WebP
1. GIF
1. SVG

:::tip
Upload the highest image quality possible. You can customize the size of the images served in your front end in the next step.
:::

## Generate URLs for different image sizes

You may want to use differently sized images for different parts of your projects. For example when creating responsive designs, you'll want to use larger, higher quality images on wider screens, and smaller, optimized images on smaller screens.

You can access each image you upload to Nordcraft via a unique URL. The format of each image URL is as follows:

`/cdn-cgi/imagedelivery/{image_id}/{project_name}:{image_name}.{image_type_extension}/{size}`

To generate a URL for a differently sized image, click the image in the **Media** section of the project sidebar, which opens the **Media details** view.

![The media details dialog, showing a grid list of size options at the bottom of the dialog with a copy to clipboard icon, and a preview of the generated image above.|16/9](media-details.webp 'Media details')

Click the button for the size of the image you would like to generate to copy the unique URL to the clipboard. For example, if you click [kbd]128px[kbd], the following URL will be copied to your clipboard:

`/cdn-cgi/imagedelivery/{image_id}/{project_name}:{image_name}.{image_type_extension}/128`

Clicking each option will show you a preview of the generated image size. Paste the copied URL into the `src` attribute of an HTML image element to use that generated image size.

:::info
The provided size options refer to the **width** of the generated image. You are only able to generate images using the sizes provided in the UI, but these are varied enough to account for most use cases.
:::

The following image width sizes are supported:

- 16px
- 32px
- 128px
- 256px
- 540px
- 720px
- 1280px
- 4k
- Full (the original size of the image)

:::info
Images cannot be upscaled to be larger than the original file uploaded. For example, if you upload an image that is 400x400px and select the 4k option, the generated image will be 400x400px.
:::

## Delete images

To delete an image, right click the image in the **Media** section of the project sidebar and select delete.

:::warning
If you delete your project, all images will also be deleted, even if you previously cloned the project.
:::
