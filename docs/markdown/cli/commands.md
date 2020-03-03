<!-- .slide: class="sfeir-basic-slide with-code" -->
# Commands: Créer un projet
<br><br>
```sh
ng new my-awesome-app
```
<!-- .element: class="big-code" -->
<br><br>
<ul>
    <li>Initialise un projet entier, prêt à être mis en production</li><br>
    <li>Initialise un repo GIT, avec un premier commit (option que l'on peut désactiver)</li><br>
    <li>Install les dépendances (on peut choisir entre npm ou yarn)</li>
</ul>
Notes
- Cette commande possède beaucoup plus d'options comme le choix de l'extension style (scc, css, sass, ...). On peut également choisir si l'on souhaite ou non installer un routing

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Commands: Créer un composant
<br><br>
```sh
ng generate component user
```
<!-- .element: class="big-code" -->
<br>
Cette commande génère les fichiers suivants:<br>
<ul>
    <li>src/app/user/user.component.css</li><br>
    <li>src/app/user/user.component.html</li><br>
    <li>src/app/user/user.component.spec.ts</li><br>
    <li>src/app/user/user.component.ts</li><br>
</ul>
Notes
- l'extension du style dépend du choix que vous avez fait lors de l'initialisation de votre projet
- On peut skipper la création du fichier test si à l'initialisation de votre projet l'option skip test a été désactivée
- il existe une commande plus rapide avec des alias: ng g component user
- Attention si l'option module n'est pas précisé, le composant sera importé dans le root module

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Commands: Créer un service
<br><br>
```sh
ng generate service user
```
<!-- .element: class="big-code" -->
<br><br>
Cette commande génère les fichiers suivants:<br>
<ul>
    <li>src/app/user.service.spec.ts</li><br>
    <li>src/app/user.service.ts</li>
</ul>
Notes
- Imaginons que l'on tape la commande ng generate service shared/user, le cli créera les même fichier que précédemment mais dans le dossier shared
- Il existe un raccourcie de cette commande n g service user

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Et sinon on peut générer quoi d'autre?
<br>
<img alt="h-800 center" src="assets/images/school/cli/generate_helper.png" />



