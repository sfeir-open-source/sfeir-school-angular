<!-- .slide -->
# Qu'est ce que le server side rendering ?
![h-900 center](assets/images/school/server-side/schema-ssr.png)

##==##

<!-- .slide -->
# A quoi peut servir le server side rendering ?

- Amélioration de l'indexation ce qui implique une performance de SEO<br><br>
- Amélioration des performances sur mobile et les appareils avec connexion internet faible<br><br>
- Affichage de la première page plus rapide

##==##

<!-- .slide: class="with-code inconsolata" -->
# Et Angular universal dans tout ça ?  

- Angular Universal est le package permettant de réaliser du server side rendering en Angular
- Il s'agit d'un simple package à installer<br><br>

```sh
ng add @nguniversal/express-engine
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide -->
# Que fait cette commande ?<br>
- Modifie votre architecture racine<br><br>
- Crée le server-side module nommé app.server.module

##==##

<!-- .slide: class="with-code inconsolata" -->
# Comment lancer mon application<br>

```sh
npm run build:ssr && npm run serve:ssr
```
<!-- .element: class="big-code" -->
