# Exercice 12-service (dossier apps/12-service)

Ce workshop a plusieurs objectifs:
- commencer à rendre l'architecture atomique en utilisant les notions précédemment acquises sur les modules
- créer ses propres services
- comprendre la notion de scope d'injection

<br>

## Etape 1

Dans le dossier **src** créez un dossier **core**

Dans le dossier **core** créez un module **CoreModule**

Dans le module **CoreModule**, dans la propriété **imports**, ajoutez le module **HttpClientModule**

Dans le module **AppModule**, dans la propriété **imports**, retirez le module **HttpClientModule** et ajoutez le module **CoreModule** que vous venez de créer

<br><br>

## Etape 2

Dans le dossier **core** créez un dossier **providers**

Dans le dossier **providers** créez le service **PeopleService**

Ce service permettra par la suite de regrouper tous les appels au back-end
<br><br>

# Etape 3

Injectez le service **HttpClient** d'Angular dans votre service **PeopleService**
<br><br>

# Etape 4

Regroupez dans votre service **PeopleService** tous les appels backend réalisés jusqu'ici :

-   getPeople (**HomeComponent** et **PeopleComponent**)
-   getRandomPeople (**HomeComponent**)
-   deletePeople (**PeopleComponent**)

Astuces: toutes les méthodes que vous allez créer dans ce service doivent retourner un **Observable** afin de pouvoir **subscribe** dessus dans les composants
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
