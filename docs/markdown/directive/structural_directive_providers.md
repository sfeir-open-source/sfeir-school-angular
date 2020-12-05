# Introduction à de nouveaux services :) !

- ComponentFactoryResolver<br><br>
- TemplateRef<br><br>
- ViewContainerRef<br><br>

##==##

# Le service componentFactoryResolver

- Permet de créer une factory de component <br><br>
- Possède la méthode : __resolveComponentFactory__ prenant en paramètre un composant <br><br>
- Le composant se place obligatoire dans la props entryComponents du Module <br><br>

##==##

# Le service ViewContainerRef

- Permet la création de vue dynamique <br><br>
- Possède plusieurs méthodes <br><br>
    - __get__: récupère une vue par rapport à son container
    - __clear__: détruit toutes les vue du container
    - __createEmbeddedView__: instancie une vue et l'insert dans son container
    - __createComponent__: instancie un composant et l'insert dans son container
    - __insert__: insert une vue dans son container
    - __move__: déplace une vue dans son container
    - __remove__: supprime une vue dans son container
    - __detach__: enlève une vue de son container sans la supprimer
    - __indexOf__: récupère l'index de la vue

##==##

# Le service TemplateRef

- Permet de récupérer un template imbriqué <br><br>
- Permet de créer par la suite une vue grâce au service ViewContainerRef
