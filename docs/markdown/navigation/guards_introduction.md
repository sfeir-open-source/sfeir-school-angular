<!-- .slide: class="sfeir-basic-slide" -->
# Généralités sur les Guards
<br><br>
- Hook de vérification / ou de préfetching avant la navigation vers une route <br><br>
- Il existe plusieurs guards en fonction de sa navigation (2 types vérification, fetching)<br><br>
- Un guard consiste en un service Angular

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Les différents guards
<br><br>
- __CanActivate__: hook avant de naviger vers une route<br><br>
- __CanActivateChild__: hook avant de naviguer vers une route enfant<br><br>
- __CanDeactivate__: hook lorsque l'on quitte la route courante<br><br>
- __CanLoad__: hook lorsque l'on navigue vers un module lazyloader<br><br>
- __Resolve__:  hook permettant de fetcher des data avant de naviguer vers une route<br><br>
Notes
- les 4 premiers guards sont des guards de "vérification authorisation"
- le 5ième consiste vraiment à optimier l'affichage de votre application

