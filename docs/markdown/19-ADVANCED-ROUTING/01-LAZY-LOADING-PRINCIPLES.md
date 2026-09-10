# Where we left the Staff Directory

- `app.route.ts` is a **flat, eager** route table today<br/><br/>
- `/home`, `/people`, `/people/:id` all sit side by side<br/><br/>
- `StaffDirectory` and `PersonDetails` (and everything they pull in — Angular Material's dialog, forms...) ship in the **initial bundle**, whether the visitor ever opens `/people` or not

##==##

# What could we lazy load?

- A single standalone component (`loadComponent`)<br/><br/>
- A **group** of routes owned by a feature (`loadChildren`)<br/><br/>
- Anything triggered by user interaction, via a plain dynamic `import()`

##==##

# The principle of lazy loading

- Avoids putting all the application's code into a single bundle<br/><br/>
- Defers loading a feature's code until it's actually needed<br/><br/>
- Reduces the initial bundle size → faster first paint<br/><br/>
- The router already knows how to trigger this: it downloads the extra JS chunk the moment navigation targets that route

##==##

# Lazy loading with standalone components

- No `NgModule` needed just to group things for lazy loading<br/><br/>
- Each **feature owns its own routing file**, colocated with the components it configures<br/><br/>
- The root route table only knows *where* to load a feature from, not *what* is inside it

##==##

# The Staff Directory, reshaped

In `apps/16-advanced-routing`, `/people` stops being two unrelated top-level entries that happen to share a URL prefix:

<br/>

- `people` and `people/:id` become **child routes** of one feature-owned entry point<br/><br/>
- That entry point is fetched **on demand**, via `loadChildren`<br/><br/>
- `person-details` moves from a sibling folder at the app root, into `feature/staff-directory/`, because it *is* part of that feature
