<!-- .slide: class="with-code inconsolata" -->
# Setup Native Federation

Utiliser la Native Federation sans une librairie Angular peut s'avérer complexe <br/><br/>

Heureusement, une librairie Angular existe: __@angular-architects/native-federation__ <br/><br/>

```shell
npm i @angular-architects/native-federation -D
```
<!-- .element: class="big-code" -->

<br/><br/>

Cette librairie doit être installée dans l'application shell et l'application remote
<!-- .element: class="important" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Définir une application comme remote

Une fois le package installé dans votre application de nouveau schematics sont disponibles <br/><br/>
Pour définir votre application comme étant une app remote, lancer la commande suivante <br/><br/>

```shell
ng g @angular-architects/native-federation:init --project angular-remote --port 4201 --type remote
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Définir une application comme host

Une fois le package installé dans votre application de nouveau schematics sont disponibles <br/><br/>
Pour définir votre application comme étant une app host, lancer la commande suivante <br/><br/>

```shell
ng g @angular-architects/native-federation:init --project angular-host --port 4200 --type host
```
<!-- .element: class="big-code" -->

##==##

# Que font ces schematics

Les fichiers que génère les schematics sont les suivants <br/><br/>

- federation.config.js -> configuration de la native federation <br/><br/>
- bootstrap.ts -> fichier de bootstrap de l'application (contenue du main.ts) <br/><br/>
- main.ts -> fichier modifié pour initier la native federation et ensuite bootstrap l'application <br/><br/>
- manifest.json -> uniquement pour le host, déclaration des remotes <br/><br/>


##==##

<!-- .slide: class="with-code inconsolata" -->
# Le fichier de configuration de la native federation

```typescript
const {
  withNativeFederation,
  shareAll,
} = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'angularRemote',

  exposes: {
    './Component': './projects/mfe1/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    }),
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
    // Add further packages you don't need at runtime
  ],
});
```
<!-- .element: class="medium-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Le fichier de déclaration des Remotes

```json
{
  "remotes": {
    "angularRemote": "http://localhost:4201",
  }
}
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Les différents type de remotes

Les remotes module peuvent être de différents types

- composant <br/><br/>
- composant standalone <br/><br/>
- ensemble de route standalone <br/><br/>
- module

<br/><br/>

Pour charger un module et ce qu'il exporte, utiliser la fonction suivante <br/><br/>

```typescript
const component = await loadRemoteModule('angularRemote', './Component');
```
<!-- .element: class="big-code" -->

