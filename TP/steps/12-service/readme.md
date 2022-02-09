# Exercice 12-service (dossier steps/12-service)

<br>

## Etape 1

Créez dans le dossier shared/people-service le service **people service**. Ce service permettra par la suite de regrouper tous les appels back-end
<br><br>

# Etape 2

Injectez le service httpCLient d'Angular dans votre service PeopleService
<br><br>

# Etape 3

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
npm run client -- 12-service
```
