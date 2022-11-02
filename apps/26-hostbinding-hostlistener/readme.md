# Exercice 26-hostbinding-hostlistener (dossier apps/26-hostbinding-hostlistener)

L'objectif de ce workshop est d'utiliser les annotations @Hostbinding and @Hostlistener

<br>

## Etape 1

Dans le fichier **badge.directive.ts** bindez la propriété **style.color** à la variable **iconColor** qui sera de type **string** grâce à l'annotation **@Hostbinding**

<br><br>

## Etape 2

Dans le fichier **badge.directive** créez :

-   un **HostListener** sur l'event **mouseEnter** grâce à l'annotation **@HostListener** qui devra passer la couleur du badge en rouge
-   un **HostListener** sur l'event **mouseLeave** grâce à l'annotation **@HostListener** qui devra passer la couleur du badge en noir

Astuce: pour changer de couleur il suffit de settez la variable badgeColor à 'red' ou 'black'

<br><br>

## Etape 3

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 26-hostbinding-hostlistener
```
