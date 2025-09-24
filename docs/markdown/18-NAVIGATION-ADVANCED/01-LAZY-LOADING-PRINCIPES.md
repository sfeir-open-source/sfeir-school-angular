# What could we Lazy load in an Angular application?

- Lazy Loading of modules<br/><br/>
- Lazy Loading of standalone components<br/><br/>
- Lazy Loading a group of standalone components<br/><br/>

##==##

# The Principle of Lazy Loading

- Avoids loading all module code into a single bundle<br/><br/>
- Allows deferring the loading of a part of the application<br/><br/>
- Reduces the initial bundle size<br/><br/>
- Improves performance<br/><br/>
- Improves user experience

##==##

# The Principle of Lazy Loading with Modules

- Implementing lazy loading of modules in your application implies organizing your project well beforehand
- <b>Root Module</b>: your application's loading module (app.module.ts)
- <b>Feature Module</b>: grouping a specific application feature into a module (page components)<br/><br/>

![](assets/images/school/lazy-loading/module-architecture-level-1.png 'center h-400')

##==##

# The Principle of Lazy Loading with Modules

![](assets/images/school/lazy-loading/module-architecture-level-2.png 'full-center')

##==##

# The Principle of Lazy Loading with Standalone Components

- Standalone components can be lazy loaded without requiring modules<br/><br/>
- Simplifies the application structure by eliminating module wrappers<br/><br/>
- Provides more granular control over what gets loaded and when<br/><br/>
- Reduces bundle size by loading components only when needed<br/><br/>

##==##

# Lazy Loading Standalone Components: Key Benefits

- **Simplified Code Structure**: No need for feature modules just for lazy loading<br/><br/>
- **Improved Developer Experience**: More straightforward routing configuration<br/><br/>
- **Better Tree-Shaking**: More precise dependency tracking<br/><br/>
- **Faster Compilation**: Smaller compilation units<br/><br/>

##==##

# Lazy Loading Strategies with Standalone Components

- **Route-based Lazy Loading**: Load components when a specific route is activated<br/><br/>
- **Component Groups**: Load related components together using `loadChildren`<br/><br/>
- **On-demand Loading**: Load components based on user interaction using `import()`<br/><br/>
- **Preloading**: Configure preloading strategies for better UX<br/><br/>
