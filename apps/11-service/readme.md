# Exercice 12-service (dossier apps/12-service)

Ce workshop a plusieurs objectifs:
- commencez à rendre votre architecture atomique en utilisant la notion précédemment acquises sur les modules
- créez ses propres services et comprendre la notion de scope d'injection

<br>

## Etape 1

Dans le dossier src, créez un dossier core

<br><br>

## Etape 2

Dans le dossier core créer un dossier providers

Créez dans le dossier providers le service **people service**. Ce service permettra par la suite de regrouper tous les appels back-end
<br><br>

# Etape 3

Injectez le service httpCLient d'Angular dans votre service PeopleService
<br><br>

# Etape 4

Regroupez dans votre service **PeopleService** tous les appels backend réalisés jusque maintenant

-   getPeople (HomeComponent et PeopleComponent)
-   getRandomPeople (HomeComponent)
-   deletePeople (PeopleComponent)

Astuces: toutes les méthodes que vous allez créer dans ce service doivent retourner un Observable afin de pouvoir subscribe dessus dans les composants
<br><br>

## Etape 5

Injectez votre service dans les composants **HomeComponent** et **PeopleComponent** afin de remplacer l'injection du service **HttpClient**

Remplacez le nécessaire afin d'utiliser votre nouveau service
<br><br>

## Etape 6

Vérifiez votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 11-service
```
