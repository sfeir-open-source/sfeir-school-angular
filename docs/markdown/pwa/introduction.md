<!-- .slide: class="sfeir-basic-slide" -->
# Qu'est ce qu'une progressive web app (PWA)
<br>
<span class="full-center important">Application web installable sur mobile</span>
Notes
- Pour plus d'information sur le sujet, il existe une school dédiée à ce sujet

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# De quoi est composé une PWA
<br><br>
- Service worker qui détient la logique de votre PWA (stratégie de caching, vos différents caches, lifecycle)
- Manifest: décrit comment doit être installer votre application

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Comment rendre mon app Angular PWA
<br><br>
Une simple ligne de commande
<br><br>
```sh
ng add @angular/pwa
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les conséquences de cette ligne de commande
<br><br>
- ajoute le package @angular/service-worker à votre projet
- authorise le support du service worker in CLI (modifie le fichier angular.json)
- Importe et enregistre le service worker dans le AppModule
- Modifie le fichier index.html (importe le manifest et meta tag pour le theme couleur)
- Installe les icons (icon d'installation pwa)
- Créé le fichier de configuration de votre service worker (ngsw-config.json)

Notes
- Angular pwa utilise workbox en arrière plan

