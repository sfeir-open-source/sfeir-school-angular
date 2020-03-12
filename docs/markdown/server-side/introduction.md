<!-- .slide: class="sfeir-basic-slide" -->
# Qu'est ce que le server side rendering?
<img alt="h-900 center" src="assets/images/school/server-side/schema-ssr.png" />

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# A quoi peut servir le server side rendering?
<br><br>
- Amélioration de l'indexation ce qui implique une performance de SEO<br><br>
- Amélioration des performances sur mobile et appareils avec connection internet faible<br><br>
- Affichage de la première page plus rapide

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Et Angular universal dans tout ça? 
<br><br>
<ul>
    <li>Angular universal est le package permettant de réaliser du server side rendering en Angular</li>
    <li>Il s'agit d'un simple package à installer</li>
</ul>
<br><br>
```
ng add @nguniversal/express-engine
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Que me réalise cette commande?
<br>
- Modifie votre architecture racine
- Crée le server-side module nommé app.server.module

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Comment lancer mon application
<br><br><br>
```
npm run build:ssr && npm run serve:ssr
```
<!-- .element: class="big-code" -->
