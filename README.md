# Angular 200

A [SFEIR School](https://www.sfeir.com/formation/school/)

![logo](https://www.sfeir.com/img/school/formations/Angular%20200.png)

[Calendrier des formations, liste des formateurs et programme de formation](https://www.sfeir.com/formation/school/angular-200/)

## Installation

- `git clone https://github.com/sfeir-open-source/sfeir-school-angular.git`
- `cd sfeir-school-angular`
- `npm install`

## Slides

Les slides sont disponibles ici : [Sfeir School Angular](https://sfeir-open-source.github.io/sfeir-school-angular/)

Les Slides sont derrière une license [CC BY ND 3.0](https://github.com/sfeir-open-source/sfeir-school-angular/blob/master/docs/LICENSE)

## Commandes

La formation se déroule step by step, chaque TP ayant deux projets associés dans le dossier [`apps/`](apps), un pour la réalisation de l'excice et un autre avec la solution pour cet exercice, toujours intitulé avec le nom du projet step suivi de `-solution`.

Chacun de ces projets étant un projet Angular CLI, vous pouvez utiliser les commande Angular CLI habituelles.
Exemple : `ng test <projet>`

Nous avons cependant mis en place différents scripts pour vous faciliter cela. Cf. (package.json)[package.json].
La majorité de ces scripts sont simplement des alias pour une commande Angular CLI. Vous pouvez donc utiliser les options de Angular CLI, mais [après l'option `--` de npm](https://docs.npmjs.com/cli/run-script.html) afin de lui indiquer qu'il s'agit d'options à passer au script et non d'options npm.

- lancer le server nodejs : `npm run server:start` (indispensable pour tous les exercices avec des appels HTTP)
- lancer la Web App : `npm run client -- <projet>`
- en mode prod : ̀npm run client -- <projet> --prod`
- lancer les tests unitaires : `npm run client:test --  <projet>`
- lancer les slides: `npm run start:prez`

Voir la [documentation d'Angular CLI](https://angular.io/cli) pour toute autre commande.
