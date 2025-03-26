# Pourquoi créer une librairie ?

<br/><br/>

- partager de la logique entre plusieurs projets <br/><br/>
- s'abstraire d'une complexité au sein d'un même projet <br/><br/>

##==##

# Définition officielle d'une librairie ?

Une librairie Angular est un ensemble de composants, de services et d'autres éléments qui peuvent être partagés entre plusieurs applications Angular. <br/><br/> 
Il existe plusieurs types de librairies Angular, chacune ayant ses propres caractéristiques et cas d'utilisation:
<br/><br/>

- librairie de composants <br/><br/>
- librairie helpers <br/><br/>
- librairie de logique métier <br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->
# Comment créer une librairie avec Angular ?

Le CLI d'Angular sera votre meilleur allié pour créer une librairie Angular. <br/><br/>

```shell
ng new sfeir-library-workspace  --no-create-application
```
<!-- .element: class="big-code" -->

<br/><br/>

Puis dans le dossier sfeir-library-workspace, exécutez la commande suivante pour créer une librairie:

<br/><br/>

```shell
ng generate library sfeir-components
```
<!-- .element: class="big-code" -->

##==##

# Pourquoi créer un workspace ?

<br/><br/>

Un wokspace fait plus de sens lors de la création d'une librairie Angular dans le sens ou elle peut contenir plusieurs librairies. <br/><br/>
Ce workspace pourra également contenir des applications Angular pour tester vos librairies. <br/><br/>


##==##

<!-- slide: class="with-code inconsolata" -->
# Un Angular.json qui a bien changé

<br/><br/>

```json
{
  "projects": {
    "sfeir-components": {
      "root": "projects/sfeir-components",
      "sourceRoot": "projects/sfeir-components/src",
      "projectType": "library",
      "prefix": "lib",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr"
        }
      }
    }
  }
}
```
<!-- .element: class="big-code" -->

<br/><br/>

Le code de votre libraire se trouve dans le dossier projects/sfeir-components/src. <br/><br/>


