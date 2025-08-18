<!-- .slide -->

# What is a Progressive Web App (PWA)?

**A web application with superpowers** <br/><br/>

<!-- .element: class="important center" -->

- Asset Caching <br/><br/>
- Offline Application <br/><br/>
- Responsive Application <br/><br/>
- Installable on mobile

Notes:

- For more information on the subject, there is a dedicated school for it.

##==##

# What makes up a PWA<br>

- Service worker which is not mandatory anymore that holds the logic of your PWA (caching strategy, your different caches, lifecycle) <br/><br/>
- Manifest: describes how your application should be installed <br/><br/>
- Application deployed on secure protocol (https)

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

# The consequences of this command line<br>

- adds the @angular/service-worker package to your project <br/><br/>
- enables service worker support in the CLI (modifies the angular.json file) <br/><br/>
- Imports and registers the service worker in the AppModule <br/><br/>
- Modifies the index.html file (imports the manifest and meta tag for the theme color) <br/><br/>
- Installs the icons (PWA installation icon) <br/><br/>
- Creates the service worker configuration file (ngsw-config.json)

Notes:

- Angular PWA uses Workbox in the background.
