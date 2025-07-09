<!-- .slide -->
# Service Worker Configuration: ngsw-config.json
![h-900 center](assets/images/school/pwa/service-worker-configuration.png)
Notes:
- All file paths must start with `/`, which corresponds to the deployment directory -> typically `dist/<project-name>`.
- `appData` allows passing additional data, typically for push notifications.
- `assetGroups`: groups of assets to be cached.
- `dataGroups`: groups of data to be cached (usually API data).
- `navigationUrls`: navigation strategy.

##==##

<!-- .slide-->
# AssetGroup Interface

- `name`: required, it identifies a group of assets between two configuration versions.<br><br>
- `installMode`: `prefetch` | `lazy` -> determines how resources are initially cached.<br><br>
- `updateMode`: `prefetch` | `lazy` -> determines how to update resources already in the cache.<br><br>
- `resources`:
    - `files`: list of files matching a certain pattern to be cached.
    - `urls`: URL or URL pattern that matches at runtime.

Notes:
- `prefetch`: installs all resources on initialization.
- `lazy`: waits for the request before caching.

##==##

<!-- .slide -->
# DataGroup Interface

- `name`: required, it identifies a data group between two configuration versions.<br><br>
- `version`: an integer used to track the version of the APIs being cached.<br><br>
- `cacheConfig`:
    - `maxSize`: maximum size of the group.
    - `maxAge`: maximum time the cache is valid.
    - `timeout`: time before the response comes from the cache.
    - `strategy`: `performance` | `freshness`.

Notes:
- `performance`: always responds from the cache (if the cache version matches the existing one), also depends on `maxAge`.
- `freshness`: retrieves the response from the network first, unless the timeout has expired.
