<!-- .slide -->
# Qu'est ce qu'une progressive web app (PWA)
__Application web dotée de super pouvoirs__
<!-- .element: class="important center" -->
<br><br>

- Cache pour Asset
- Application offline
- Application responsive
- Application installable sur mobile

Notes:
- Pour plus d'information sur le sujet, il existe une school dédiée à ce sujet

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# De quoi est composée une PWA<br>
- Service worker qui détient la logique de votre PWA (stratégie de caching, vos différents caches, lifecycle)<br><br>
- Manifest : décrit comment doit être installer votre application<br><br>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Comment rendre mon app Angular PWA

Une simple ligne de commande
<br><br>

```sh
ng add @angular/pwa
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les conséquences de cette ligne de commande<br>

- ajoute le package @angular/service-worker à votre projet
- autorise le support du service worker in CLI (modifie le fichier angular.json)
- Importe et enregistre le service worker dans le AppModule
- Modifie le fichier index.html (importe le manifest et meta tag pour le theme couleur)
- Installe les icônes (icône d'installation pwa)
- Créé le fichier de configuration de votre service worker (ngsw-config.json)

Notes:
- Angular pwa utilise workbox en arrière plan

