# HttpResource (still experimental)

- New experimental feature in Angular for managing HTTP resources <br/><br/>
- Built on top of Signals for reactive state management <br/><br/>
- Provides a more declarative way to handle server communication <br/><br/>
- Simplifies common CRUD operations with built-in state management

##==##

# Key Features

- **Signal-based state management** <br/><br/>
- Built-in loading and error states <br/><br/>
- Automatic request cancellation <br/><br/>
- Type-safe API <br/><br/>
- Integration with Angular's dependency injection <br/><br/>
- Return an **HttpResourceRef**

##==##

<!-- .slide: class="with-code inconsolata"-->

# Basic Usage

```typescript
@Component({
  selector: 'sfeir-app',
  templateUrl: './app.html',
})
export class App {
  private idUser = signal(1);
  userResource = httpResource(() => `/api/users/${this.idUser()}`);

  constructor() {
    effect(() => {
      console.log(this.userResource.value());
    });
  }
}
```

<!-- .element: class="medium-code"-->

##==##

# HttpResourceRef

HttpResource provides several signals:

- `value`: The response data <br/><br/>
- `loading`: Boolean indicating if a request is in progress <br/><br/>
- `error`: Any error that occurred <br/><br/>
- `state`: Combined state object

##==##

# HttpResourceRef Methods

- **set** allows you to manually set the value of the resource <br/><br/>
- **mutate** allows you to update the value of the resource using its previous value <br/><br/>
- **reload** reload the resource <br/><br/>

##==##

<!-- .slide: class="with-code inconsolata"-->

# Change the default type of data return by the httpResource

By default, httpResource assumes that backend is in json format <br/><br/>
You can change the type of data returned by the httpResource <br/><br/>

```typescript
httpResource.arrayBuffer(() => `/api/users/arraybuffer/${this.idUser()}`);
httpResource.blob(() => `/api/users/blob/${this.idUser()}`);
httpResource.text(() => `/api/users/text/${this.idUser()}`);
```

<!-- .element: class="medium-code"-->

##==##

<!-- .slide: class="with-code inconsolata"-->

# Change the default method of the httpResource

By default, httpResource make a GET request <br/><br/>
You can change the method with passing an HttpResourceRequest <br/><br/>

```typescript
httpResource(() => ({
  url: `/api/users/${this.idUser()}`,
  method: 'POST',
  body: {
    name: 'John Doe',
    age: 30,
  },
}));
```

<!-- .element: class="medium-code"-->

##==##

# HttpResource Advise

<br/><br/>

> Keep it mind that httpResource is design for the moment to make Get Request and need to be done in injection context
