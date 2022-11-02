# Exercice 12-pipe-using (dossier apps/12-pipe-use)

Nous venons de rajouter la date de naissance d'une personne sur la card.

Ce workshop a plusieurs objectifs:
- comprendre d'où viennent les "build-in" pipes d'Angular
- comprendre comment utiliser les "build-in" pipes d'Angular
- comprendre la syntax des pipes

<br>


## Etape 1

Dans le fichier **share.module.ts**, dans la propriété **imports**, ajoutez le module **CommonModule** du package **@angular/common**

**EXPLICATION** : 
Le module **CommonModule** exporte tous les Build-in Pipes. 
Comme le composant **CardComponent** appartient au module **SharedModule** si le module **CommonModule** n'est pas importé dans ce module, alors le composant **CardComponent** n'aura pas accès aux différents pipes que propose le **CommonModule**

## Etape 1

Dans le fichier **card.component.html**, à l'aide du pipe **date** d'Angular, affichez la date de naissance sous le format suivant: **'dd/MM/yyyy'**
<br><br>

## Etape 2

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 12-pipe-using
```
