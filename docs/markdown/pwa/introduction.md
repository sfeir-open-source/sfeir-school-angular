<!-- .slide -->
# What is a Progressive Web App (PWA)?
__A web application with superpowers__
<!-- .element: class="important center" -->
<br><br>

- Asset Caching
- Offline Application
- Responsive Application
- Installable on mobile

Notes:
- For more information on the subject, there is a dedicated school for it.

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# What makes up a PWA<br>
- Service worker that holds the logic of your PWA (caching strategy, your different caches, lifecycle)<br><br>
- Manifest: describes how your application should be installed<br><br>

##==##

<!-- .slide: class="with-code inconsolata" -->
# How to make my Angular app a PWA

A single command line
<br><br>

```sh
ng add @angular/pwa
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# The consequences of this command line<br>

- adds the @angular/service-worker package to your project
- enables service worker support in the CLI (modifies the angular.json file)
- Imports and registers the service worker in the AppModule
- Modifies the index.html file (imports the manifest and meta tag for the theme color)
- Installs the icons (PWA installation icon)
- Creates the service worker configuration file (ngsw-config.json)

Notes:
- Angular PWA uses Workbox in the background.
