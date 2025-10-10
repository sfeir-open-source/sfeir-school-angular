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

<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

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

<br/>

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

##++##
##++## class="with-code inconsolata"

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

##++##
