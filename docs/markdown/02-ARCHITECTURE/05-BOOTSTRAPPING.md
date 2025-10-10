<!-- .slide: class="transition-bg-sfeir-2" data-type-show="modern-2days" -->

# Bootstrapping

##==##

# What is bootstrapping?

- **Bootstrapping** is the process of initializing the application <br/><br/>
- 2 ways to boostrap an application: <br/><br/>
  - Boostrap an application on a **standalone component** <br/><br/>
  - Bootstrap an application on a **module** <br/><br/>

##==##
 
<!-- .slide: data-type-show="modern-2days" -->

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

<!-- .slide: class="tc-multiple-columns with-code inconsolata" data-type-show="modern-2days" -->

##++##

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
  providers: [
    // Here register your global providers like httpClient
  ],
});
```

<!-- .element: class="medium-code" -->

##++##
##++## class="with-code inconsolata"

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

##++##

