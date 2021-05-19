<!-- .slide: class="exercice" -->
# Exercice 27 : interceptors
## Exercice

- Une ébauche d'interceptor a été réalisée dans le dossier shared/interceptor
- A chaque requête il faut setter le header "Authorization" à "Sfeir"
- Vérifier votre travail en analysant la requête qui part dans l'inspecteur de votre navigateur

Notes:
- pensez à utiliser la méthode "clone()" et "setHeaders()"

##==##

<!-- .slide: class="exercice" -->
# Exercice 27 : interceptors (bis)
## Exercice

- Une ébauche de l'intercepteur cachable a été réalisé dans le dossier shared/interceptor <br><br>
- l'objectif est de renvoyer la réponse cachée lors du call random people <br><br>
- Créer un HttpContextToken initialisé à false <br><br>
- Setter le context cachable de la requête random people à true <br><br>
- Renvoyer le mock si le context de la requête est à true

##==##

<!-- .slide: class="full-center exercice" -->
# Exercice 27 : interceptors
## Solution
__steps/27-interceptors-solution__

##==##

<!-- .slide: class="exercice" -->

