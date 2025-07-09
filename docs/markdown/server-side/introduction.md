<!-- .slide -->
# What is Server-Side Rendering?
![h-900 center](assets/images/school/server-side/schema-ssr.png)

##==##

<!-- .slide -->
# What is Server-Side Rendering used for?

- Improved indexing, which leads to better SEO performance<br><br>
- Improved performance on mobile devices and low-speed connections<br><br>
- Faster first-page display

##==##

<!-- .slide: class="with-code inconsolata" -->
# And what about Angular Universal?  

- Angular Universal is the package that enables Server-Side Rendering in Angular.
- It's a simple package to install.<br><br>

```sh
ng add @nguniversal/express-engine
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# What does this command do?<br>
- Modifies your root architecture<br><br>
- Creates the server-side module named `app.server.module`

##==##

<!-- .slide: class="with-code inconsolata" -->
# How to run my application<br>

```sh
npm run build:ssr && npm run serve:ssr
```
<!-- .element: class="big-code" -->
