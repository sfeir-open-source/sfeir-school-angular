# Native Federation: Qu'est ce que c'est

Native Federation est un concept émergent qui utilise des fonctionnalités natives du navigateur pour pouvoir gérer des micro interfaces. Cela implique <br/><br/>

- nul besoin de webpack ou tout autre module bundler <br/><br/>
- un mirco frontend est en réalité un module ESM <br/><br/>
- utilise ESM pour importer les modules <br/><br/>
- framework agnostique

##==##

# Module Federation: Qu'est ce que c'est
 
La Module Federation est une fonctionnalité de Webpack 5 qui permet le chargement dynamique de modules. Les caractéristiques clés de la module federation sont les suivantes: <br/><br/>

- __Dynamisme__ permet d'importer des modules d'autres applications sans recompilation au runtime <br/><br/>
- __Partage de dépendances__ permet de partager des dépendances entre plusieurs modules <br/><br/>
- __Isolation__ chaque module peut être développé indépendamment les uns des autres <br/><br/>
- __Performance__ réduit la taille du main bundle
