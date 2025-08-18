<!-- .slide: class="transition bg-blue" -->

# NgOptimizedImage

Optimizing Images in Angular Applications

Notes:

- This section covers Angular's NgOptimizedImage directive, a powerful tool for optimizing image loading and performance
- We'll explore how to implement it and its key features

##==##

# The Problem with Images

- Images account for **50%+** of page weight on average <br/><br/>
- Common image-related issues:
  - Oversized images (downloading more pixels than needed)
  - Layout shifts during loading
  - Low-priority images blocking important resources
  - Unoptimized image formats

Notes:

- Images are often the largest contributors to page bloat
- Addressing image optimization can significantly improve performance metrics
- Poor image handling directly impacts Core Web Vitals (LCP, CLS)

##==##

# Introducing NgOptimizedImage

- Built-in Angular directive for image optimization <br/><br/>
- Automatically implements web performance best practices <br/><br/>
- Helps improve Core Web Vitals scores <br/><br/>
- Provides warnings during development

Notes:

- NgOptimizedImage was introduced to simplify image optimization in Angular apps
- It's designed to help developers follow best practices without deep performance expertise
- The directive provides helpful warnings in development mode

##==##

<!-- .slide: class="with-code inconsolata" -->

# Getting Started

The first step is to import the directive

- for standalone, it needs to be declared in the imports' array of **@Component annotation** <br/><br/>
- for NgModules it needs to be declared in the imports' array of **NgModule annotation**

```typescript
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './home.html',
})
export class Home {}
```

<!-- .element: class="medium-code" -->

Notes:

- NgOptimizedImage is part of @angular/common
- Can be imported in standalone components or NgModules
- No additional packages are needed

##==##

<!-- .slide: class="with-code inconsolata" -->

# Basic Usage

Replace `src` with `ngSrc`: <br/><br/>

```angular181html
<!-- Before: Standard img tag -->
<img src="profile.jpg" width="200" height="200" alt="Profile picture" />

<!-- After: Using NgOptimizedImage -->
<img ngSrc="profile.jpg" width="200" height="200" alt="Profile picture" />
```

<!-- .element: class="big-code" -->

Notes:

- The main change is replacing src with ngSrc
- This activates the NgOptimizedImage directive
- The directive will then apply various optimizations

##==##

<!-- .slide: class="with-code inconsolata" -->

# Required Attributes

- Width and height are **required** to prevent layout shifts: <br/><br/>
- It will raise an error if not provided <br/><br/>

```html
<img ngSrc="hero.jpg" width="400" height="300" alt="Hero image" />
```

<!-- .element: class="big-code" -->

<br/><br/>

For responsive images, use the intrinsic dimensions of the image file.

Notes:

- Width and height are mandatory to prevent Cumulative Layout Shift (CLS)
- For responsive images, use the original dimensions of the image
- The browser will maintain an aspect ratio when scaling

##==##

<!-- .slide: class="with-code" -->

# Priority Images

Mark important images (especially LCP images) as priority: <br/><br/>

```html
<img ngSrc="hero.jpg" width="800" height="400" priority alt="Hero image" />
```

<!-- .element: class="medium-code" -->

<br/><br/>

This applies three optimizations:

- Sets **fetchpriority**="high"
- Sets **loading**="eager" (disables lazy loading)
- Generates a preload link when using SSR

Notes:

- The priority attribute is crucial for LCP (Largest Contentful Paint) images
- Angular will warn you during development if the LCP image doesn't have priority
- This ensures critical images load as quickly as possible

##==##

<!-- .slide: class="with-code inconsolata" -->

# Fill Mode

For images that should fill their container (like background images):

```html
<div style="position: relative; height: 300px;">
  <img ngSrc="background.jpg" fill alt="Background image" />
</div>
```

<!-- .element: class="big-code" -->

<br/><br/>

Requirements:

- Parent must have `position: relative|absolute|fixed` <br/><br/>
- No width/height attributes needed with `fill` <br/><br/>
- Control fit with CSS `object-fit` property <br/><br/>

Notes:

- Fill mode is perfect for background-like images
- The parent container must have positioning
- You can control how the image fills the container with object-fit (cover, contain, etc.)

##==##

<!-- .slide: class="with-code inconsolata" -->

# Responsive Images with srcset

NgOptimizedImage automatically generates appropriate srcset:

```html
<!-- Fixed size image with density descriptors -->
<img ngSrc="product.jpg" width="200" height="150" alt="Product" />

<!-- Responsive image with width descriptors -->
<img ngSrc="hero.jpg" width="1200" height="600" sizes="100vw" alt="Hero" />
```

<!-- .element: class="big-code" -->

<br/><br/>

Restrictions:

- For fixed-size images, NgOptimizedImage generates a density-based srcset (1x, 2x)
- For responsive images, it generates a width-based srcset with the size attribute
- This ensures browsers download appropriately sized images

##==##

<!-- .slide: class="with-code" -->

# Custom Breakpoints

Customize responsive breakpoints using `IMAGE_CONFIG`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: IMAGE_CONFIG,
      useValue: {
        breakpoints: [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920],
      },
    },
  ],
});
```

<!-- .element: class="small-code" -->

<br/><br/>

- Default breakpoints cover most use cases
- Custom breakpoints can be useful for specific design requirements
- Configure once at the application level

##==##

<!-- .slide: class="with-code inconsolata" -->

# Image Loaders

Image loaders enable CDN integration:

```typescript
import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';

bootstrapApplication(AppComponent, {
  providers: [provideImageKitLoader('https://ik.imagekit.io/myaccount')],
});
```

<!-- .element: class="medium-code" -->

<br/><br/>

Then use relative paths in templates:

```html
<!-- Will load from https://ik.imagekit.io/myaccount/product.jpg -->
<img ngSrc="product.jpg" width="400" height="300" alt="Product" />
```

<!-- .element: class="medium-code" -->

Notes:

- Image loaders connect NgOptimizedImage to image CDNs
- Angular provides built-in loaders for popular CDNs
- This enables automatic format optimization and responsive images

##==##

<!-- .slide: class="with-code inconsolata" -->

# Built-in Loaders

Angular provides loaders for popular image CDNs:

- `provideCloudflareLoader()`
- `provideCloudinaryLoader()`
- `provideImageKitLoader()`
- `provideImgixLoader()`<br/><br/>

Example:

```typescript
import { provideCloudinaryLoader } from '@angular/common';

providers: [provideCloudinaryLoader('myaccount')];
```

<!-- .element: class="big-code" -->

Notes:

- These built-in loaders make it easy to integrate with popular CDNs
- Each loader handles the specific URL structure needed by that CDN
- This enables automatic format and size optimizations

##==##

<!-- .slide: class="with-code inconsolata" -->

# Custom Image Loader

Create your own loader for other CDNs: <br/><br/>

```typescript
import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

export function customImageLoader(config: ImageLoaderConfig): string {
  return `https://my-cdn.com/${config.src}?w=${config.width}`;
}

bootstrapApplication(AppComponent, {
  providers: [{ provide: IMAGE_LOADER, useValue: customImageLoader }];
})

```

<!-- .element: class="big-code" -->

Notes:

- Custom loaders allow integration with any image service
- The loader function receives config with src, width, and other parameters
- It should return the complete URL for the image

##==##

<!-- .slide: class="with-code inconsolata" -->

# Image Placeholders

Reduce layout shifts with placeholders: <br/><br/>

```html
<!-- Automatic blurred placeholder -->
<img ngSrc="product.jpg" width="400" height="300" placeholder alt="Product" />

<!-- Data URL placeholder -->
<img ngSrc="product.jpg" width="400" height="300" placeholder="data:image/svg+xml,%3Csvg...%3E" alt="Product" />
```

<!-- .element: class="big-code" -->

Notes:

- Placeholders improve perceived performance and reduce layout shifts
- The placeholder attribute enables automatic blurred placeholders
- You can also provide a custom placeholder with a data URL

##==##

<!-- .slide: class="with-code inconsolata" -->

# Complete Example

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideImageKitLoader } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [provideImageKitLoader('https://ik.imagekit.io/myaccount')],
};

bootstrapApplication(AppComponent, appConfig);
```

<!-- .element: class="small -code" -->

```angular181html
<!-- hero.component.html -->
<div class="hero-container" style="position: relative; height: 50vh;">
  <img ngSrc="hero-image.jpg" fill priority sizes="100vw" placeholder alt="Hero image" />
</div>

<div class="product-grid">
  @for(product of products(); track product.id) {
    <img [ngSrc]="product.jpg" width="300" height="200" sizes="(max-width: 768px) 100vw, 300px" [alt]="product.name" />
  }
</div>
```

<!-- .element: class="small-code" -->

Notes:

- This example shows a complete implementation
- Hero image uses fill, priority, and placeholder
- Product images use dynamic binding and responsive sizing

##==##

# Performance Benefits

- **Prevents layout shifts** with required dimensions <br/><br/>
- **Optimizes LCP** with priority images <br/><br/>
- **Reduces bandwidth** with responsive images <br/><br/>
- **Improves rendering** with preconnect hints <br/><br/>
- **Enhances UX** with placeholders

Notes:

- NgOptimizedImage addresses multiple performance metrics
- It helps improve Core Web Vitals scores
- The directive enforces best practices through warnings

##==##

# Best Practices

- Always mark LCP images with **priority** <br/><br/>
- Provide accurate **width** and **height** <br/><br/>
- Use **sizes** attribute for responsive images <br/><br/>
- Consider **fill** for background-like images <br/><br/>
- Use image CDNs with loaders when possible <br/><br/>
- Add **placeholder** for better UX

Notes:

- Following these best practices will maximize performance benefits
- The directive will warn you during development if these aren't followed
- These practices align with web performance best practices
