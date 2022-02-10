# Exercice 29-hostbinding (dossier steps/29-hostbinding)

<br>

## Etape 1

Dans le fichier **sfeir-badge.directive.ts**

-   bindez la propriété style.color à la variable badgeColor qui sera de type string grâce à l'annotation @Hostbinding

<br><br>

## Etape 2

Dans le fichier **sfeir-badge.directive** créez

-   un HostListener sur l'event mouseenter grâce à l'annotation @HostListener qui devra passer la couleur du badge en rouge
-   un HostListener sur l'event mouseLeave grâce à l'annotation @HostListener qui devra passer la couleur du badge en noir

Astuce: pour changer de couleur il suffit de settez la variable badgeColor à 'red' ou 'black'

<br><br>

## Etape 3

Vérifiez votre travail en lançant la commande

```bash
npm run client -- 29-hostbinding
```
