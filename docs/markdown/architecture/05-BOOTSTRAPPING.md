<!-- .slide: class="transition-bg-sfeir-2" -->

# Bootstrapping

##==##

# What is bootstrapping?

- **Bootstrapping** is the process of initializing the application <br/><br/>
- 2 ways to boostrap an application: <br/><br/>
  - Boostrap an application on a **standalone component** <br/><br/>
  - Bootstrap an application on a **module** <br/><br/>

##==##

# Bootstrapping: standalone component

<br/><br/>

> This means that the application is bootstrapped directly on a standalone component. <br/><br/>

##==##

<!-- .slide: class="with-code" -->

# Bootstrapping: standalone component

- **Files impacted**: <br/><br/>
  - `app.ts | app.component.ts`: standalone component on which to boostrap <br/><br/>
  - `main.ts`: bootstrapping configuration <br/><br/>
  - `index.html`: first file loader in CSR application, standalone component need to be called here <br/><br/>

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

## Bootstrapping: standalone component

```typescript
// app.ts | app.component.ts file
@Component({
  selector: 'sfeir-app',
  template: `<div>My app</div>`,
  styleUrls: []
})
```

<!-- .element: class="medium-code" -->

```typescript
// main.ts file
bootstrapApplication(AppComponent, {
  providers: [],
});
```

<!-- .element: class="medium-code" -->

##--##

<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/>

```html
<!-- index.html file -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My app</title>
  </head>
  <body>
    <sfeir-app></sfeir-app>
  </body>
</html>
```

<!-- .element: class="medium-code" -->

##==##

# Bootstrapping on a module

<br/><br/>

> This means that the application is bootstrapped on a module. <br/><br/>

##==##

# Bootstrapping on a module

- **Files impacted**: <br/><br/>
  - `app.ts | app.component.ts`: component on which the module need to bootstrap <br/><br/>
  - `main.ts`: bootstrapping on a module <br/><br/>
  - `app.module.ts | app-module.ts`: Module on which to bootstrap<br/><br/>
  - `index.html`: first file loader in CSR application, standalone component need to be called here <br/><br/>

##==##

<!-- .slide: class="two-column with-code inconsolata" -->

## Bootstrapping on a module

```typescript
// app.ts | app.component.ts file
@Component({
  selector: 'sfeir-app',
  template: `<div>Hello</div>`,
  standalone: false,
})
export class App {}
```

<!-- .element: class="medium-code" -->

<br/><br/>

```typescript
// app-module.ts | app.module.ts file
@NgModule({
  imports: [BrowserModule],
  declarations: [App],
  bootstrap: [App],
})
export class AppModule {}
```

<!-- .element: class="medium-code" -->

##--##

<!-- .slide: class="with-code inconsolata" -->

<br/><br/><br/><br/>

```typescript
// main.ts file
platformBrowser.bootstrapModule(AppModule).then(console.log).catch(console.error);
```

<!-- .element: class="medium-code" -->

```html
<!-- index.html file -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My app</title>
  </head>
  <body>
    <sfeir-app></sfeir-app>
  </body>
</html>
```

<!-- .element: class="medium-code" -->
