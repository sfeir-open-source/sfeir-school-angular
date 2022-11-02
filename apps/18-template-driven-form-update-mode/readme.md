# Exercice 18-template-driven-form-update (dossier steps/18-template-driven-form-update)

<br>

## Etape 1

A l'aide du CLI créez un composant **UpdatePersonComponent** dans le dossier **feature** et associez ce composant à la route **/people/:id**

Astuce: ajoutez cette nouvelle route dans le fichier **app.routing.module.ts**

<br><br>

## Etape 2

Dans le composant **CardComponent**, et particulièrement dans le fichier **card.component.html**, sur l'icon **edit** réalisez la navigation vers votre nouvelle page

Astuce: utilisez la directive **[routerLink]="['/people', person.id]"**

## Etape 3

Dans le composant **FormComponent** ajoutez une propriété **person** avec l'annotation **@Input**

<br><br>

## Etape 4

Dans le composant **FormComponent**, a l'aide du hook **OnInit**, initialisez la propriété **person** avec un object contenant juste la clé photo et comme valeur le lien de la photo par défaut si la propriété person n'est pas définie

<br><br>

## Etape 5

Dans le fichier **form.component.html**, et plus particulièrement sur la méthode **onSave**, supprimez le paramètre passé

Dans le fichier **form.component.ts**, et plus particulièrement dans la méthode **onSave**, remplacez le paramètre passé à l'**EventEmitter** par **this.person**

Dans le fichier **form.component.html** réalisez le two-way binding avec la directive **ngModel**

<br<br>

## Etape 5

Dans le composant **UpdatePersonComponent** appelez le composant **FormComponent**

<br<br>

## Etape 6

Dans le service **PeopleService** créez une méthode **updatePerson** qui prend en paramètre une personne

Endpoint: PUT http://localhost:9000/api/peoples/:id

et un endpoint qui permet de récupérer le détail de la personne

Endpoint: GET http://localhost:9000/api/peoples/:id

<br<br>

## Etape 7

Dans le composant **UpdatePersonComponent**, et particulièrement dans le lifecycle **OnInit**, récupérez le détail d'une personnes

Astuce: pensez à utiliser le provider **ActivatedRoute**

Dans le composant **UpdatePersonComponent** créez deux méthodes :

-   **updatePerson** qui update la person et qui retourne sur la page précédente une fois l'update terminée
-   **goBack** qui renvoie sur la page précédente

Pour la fonction **goBack** pensez à injecter le provider **Location** pour pouvoir utiliser la méthode back de cette classe

```javascript
this.location.back()
```

<br><br>

## Etape 8

Dans le composant **UpdatePersonComponent** réagissez aux évènements **submit** et **cancel** de votre composant **FormComponent** en appelant respectivement les méthodes suivantes:

-   **updatePerson**
-   **goBack**

<br><br>

## Etape 9

Vérifiez votre travail en lançant la commande suivante:

```bash
npm run client -- 18-template-driven-form-update
```
