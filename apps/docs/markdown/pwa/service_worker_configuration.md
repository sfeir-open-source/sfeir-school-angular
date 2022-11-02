<!-- .slide -->
# Configuration d'un service worker : ngsw-config.json
![h-900 center](assets/images/school/pwa/service-worker-configuration.png)
Notes:
- Tous les chemins de fichier doivent obligatoirement commencer par / qui correspond au répertoire de déploiment -> typiquement dist/<project-name>
- App Data permet de passer des données supplémentaires, typiquement des données à faire passer lors des notifications push
- AssetsGroup : des groupes d'assets à cacher
- dataGroups : groupes de données à cacher (data API en général)
- navigationUrls : stratégie de navigation

##==##

<!-- .slide-->
# Interface AssetGroup

- name : requis, il permet d'identifier un groupe d'assets entre deux versions de configuration<br><br>
- installMode : prefetch | lazy -> détermine comment les ressources sont initialement cachées<br><br>
- updateMode : prefetch | lazy -> détermine comment modifier les ressources déjà en cache<br><br>
- ressources :
    - files : liste de fichiers qui match un certain pattern à cacher
    - urls : url / url pattern qui match au runtime

Notes:
- prefetch : installe toutes les ressources à l'initialisation
- lazy : attend d'avoir la requête avant de mettre en cache

##==##

<!-- .slide -->
# Interface DataGroup

- name : requis, il permet de d'identifier un groupe de data entre deux versions de configuration<br><br>
- version : un entier qui permet de suivre la version des apis que l'on cache<br><br>
- cacheConfig
    - maxSize : taille maximum du groupe
    - maxAge : temps maximum pendant lequel le cache est valide
    - timeout : temps avant que la réponse vienne du cache
    - strategy : performance | freshness

Notes:
- performance : réponse toujours du cache (si la version du cache match à celle qui existe déjà), dépend également du maxAge
- freshness : récupère déjà la réponse du network sauf si le timeout a expiré
