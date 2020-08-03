# Communication avec le service worker
<br><br>

 - 2 hooks
    - available : nouvelle version de l'application à loader si la page est rafraîchie
    - activated : le service woker commence à déployer une nouvelle version de l'application  


<br><br>

- 2 méthodes
 - checkForUpdate : demande au service worker de vérifier si une nouvelle version est disponible
 - activateUpdate : force la mise à jour de l'application

##==##

<!-- .slide: class="with-code inconsolata" -->
# Exemple
<br><br>

```typescript
@Injectable()
export class PromptUpdateService {
  constructor(updates: SwUpdate) {
    updates.available.subscribe(event => {
      if (promptUser(event)) {
        updates.activateUpdate().then(() => document.location.reload());
      }
    });
  }
}
```
<!-- .element: class="big-code" -->
