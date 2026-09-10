<!-- .slide -->

# Angular Server-Side Rendering (SSR)

## Introduction to Hybrid Rendering

![](assets/images/school/server-side/schema-ssr.png 'h-900 center')

##==##

# What is Server-Side Rendering?

**Server-Side Rendering (SSR)** is a technique where Angular applications are rendered on the server before being sent to the client.

<br>

**Key Benefits:**

- **Faster initial page loads** - HTML is rendered on the server
- **Better SEO** - Search engines receive fully rendered HTML
- **Improved performance** on mobile devices and slow connections
- **Better Core Web Vitals** - Faster First Contentful Paint (FCP)

##==##

# Client-Side vs Server-Side Rendering

| **Client-Side Rendering (CSR)** | **Server-Side Rendering (SSR)** |
| -------------------------------- | -------------------------------- |
| JavaScript runs in browser       | JavaScript runs on server         |
| Slower initial load              | Faster initial load               |
| Better for interactive apps      | Better for content-heavy pages    |
| Simple development model         | Requires server-compatible code   |
| Poor SEO by default              | Excellent SEO                     |

##==##

# What is Hybrid Rendering?

**Hybrid rendering** combines the benefits of:

- **Server-Side Rendering (SSR)** - Dynamic content rendered on server
- **Static Site Generation (SSG)** - Pre-rendered at build time
- **Client-Side Rendering (CSR)** - Interactive features in browser

<br/><br/>

This gives you **fine-grained control** over how different parts of your app are rendered for optimal user experience.
