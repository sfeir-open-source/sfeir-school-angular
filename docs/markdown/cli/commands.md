<!-- .slide: class="with-code inconsolata" -->

# Commande: Créer un projet

<br><br>

```sh
ng new my-awesome-app
```

<!-- .element: class="big-code" -->

<br><br>

-   Initialise un projet entier, prêt à être mis en production <br><br>
-   Initialise un répo GIT, avec un premier commit (option que l'on peut désactiver)<br><br>
-   Installe les dépendances (on peut choisir entre npm et yarn comme package manager)<br><br>
    Notes:
-   Cette commande possède beaucoup plus d'options comme le choix de l'extension style (scc, css, sass, ...). On peut également choisir si l'on souhaite ou non installer un routing

##==##

<!-- .slide: class="with-code inconsolata" -->

# Commande: Créer un composant

```sh
ng generate component user
```

<!-- .element: class="big-code" -->
<br>

-   Cette commande génère les fichiers suivants:<br> - src/app/user/user.component.ts<br> - src/app/user/user.component.html<br> - src/app/user/user.component.css<br> - src/app/user/user.component.spec.ts
    Notes:
-   l'extension du style dépend du choix que vous avez fait lors de l'initialisation de votre projet
-   On peut skipper la création du fichier test si à l'initialisation de votre projet l'option skip test a été désactivée
-   il existe une commande plus rapide avec des alias: ng g component user
-   Attention si l'option module n'est pas précisé, le composant sera importé dans le root module

##==##

<!-- .slide: class="with-code inconsolata" -->

# Commande: Créer un service

<br>

```sh
ng generate service user
```

<!-- .element: class="big-code" -->

<br>

-   Cette commande génère les fichiers suivants:<br> - src/app/user.service.ts<br> - src/app/user.service.spec.ts
    Notes:
-   Imaginons que l'on tape la commande ng generate service shared/user, le cli créera les mêmes fichiers que précédemment mais dans le dossier shared
-   Il existe un raccourci de cette commande n g service user

##==##

<!-- .slide: class="full-center"  -->

# Et sinon on peut générer quoi d'autre ?

<br><br>

![h-800](assets/images/school/cli/generate_helper.png)
