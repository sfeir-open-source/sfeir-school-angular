<!-- .slide-->
# The Principle of Lazy Loading

- Lazy Loading of modules<br/><br/>
- Avoids loading all module code into a single bundle<br/><br/>
- Allows deferring the loading of a part of the application<br/><br/>
- Angular has chosen to rely on the concept of Modules (NgModules) and routes to handle this issue.

##==##

<!-- .slide-->
# The Principle of Lazy Loading

- Implementing lazy loading of modules in your application implies organizing your project well beforehand<br/><br/>
- <b>Root Module</b>: your application's loading module (app.module.ts)
- <b>Feature Module</b>: grouping a specific application feature into a module (page components)<br/><br/>
  ![full-center](assets/images/school/lazy-loading/module-architecture-level-1.png)

##==##

<!-- .slide-->
# The Principle of Lazy Loading
![full-center](assets/images/school/lazy-loading/module-architecture-level-2.png)
