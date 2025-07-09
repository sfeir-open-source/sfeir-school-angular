# Communicating with the Service Worker

 - 2 hooks
    - `available`: a new version of the application is ready to be loaded if the page is refreshed.
    - `activated`: the service worker has started deploying a new version of the application.

<br><br>

- 2 methods
 - `checkForUpdate()`: asks the service worker to check if a new version is available.
 - `activateUpdate()`: forces the application update.

##==##

<!-- .slide: class="with-code inconsolata" -->
# Example

```typescript
@Injectable({ providedIn: 'root' })
export class PromptUpdateService {
  constructor(updates: SwUpdate) {
    updates.versionUpdates.subscribe(event => {
        if (event.type === 'VERSION_READY') {
            if (confirm('A new version is available. Load it?')) {
                updates.activateUpdate().then(() => document.location.reload());
            }
        }
    });
  }
}
```
<!-- .element: class="big-code" -->
