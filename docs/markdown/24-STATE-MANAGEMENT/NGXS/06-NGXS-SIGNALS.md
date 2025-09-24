<!-- .slide: class="with-code"-->

# NGXS Signal Utilities

NGXS offers utilities for working with signals that can be used with various state management solutions: <br/><br/>

```typescript
// All utilities are available in the @ngxs/store package
import { select, createSelectMap, createDispatchMap } from '@ngxs/store';
```

<!-- .element: class="big-code" -->

<br/>

These utilities are:

- Independent of any specific state management framework
- Promote modularity and flexibility in your applications
- Compatible with other signal-based solutions like NgRx SignalStore

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `select` Function

The `select` function retrieves a signal from the state:<br/><br/>

```typescript
import { select } from '@ngxs/store';
@Component({ selector: 'sfeir-app', templateUrl: './app.html' })
class AppComponent {
  // Creates a signal from a selector
  invoiceId = select(InvoiceState.getInvoiceId);
}
```

<!-- .element: class="big-code" -->

<br/>

- Acts as a shortcut for `store.selectSignal`
- Eliminates the need to inject the Store service
- Can be used directly in components and services

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `createSelectMap` Function

Creates an object where keys are mapped to signals from state selectors: <br/><br/>

```typescript
import { createSelectMap } from '@ngxs/store';

@Component({ selector: 'sfeir-app', templateUrl: './app.html' })
class AppComponent {
  selectors = createSelectMap({
    invoiceId: InvoiceState.getInvoiceId,
    invoiceSignature: InvoiceState.getInvoiceSignature,
    invoiceLines: InvoiceLinesState.getInvoiceLines,
  });
}
```

<!-- .element: class="small-code" -->

<br/>

In templates, you can use these signals directly:

```html
<div>
  <p>Invoice ID: {{ selectors.invoiceId() }}</p>
  <p>Invoice signature: {{ selectors.invoiceSignature() }}</p>
  <p>Invoice lines: {{ selectors.invoiceLines() | json }}</p>
</div>
```

<!-- .element: class="small-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `createDispatchMap` Function

Creates an object where keys are mapped to functions that dispatch actions:

```typescript
import { createDispatchMap } from '@ngxs/store';

@Component({ selector: 'sfeir-app', templateUrl: './app.html' })
class AppComponent {
  actions = createDispatchMap({
    updateInvoiceSignature: InvoiceActions.UpdateInvoiceSignature,
    reloadInvoiceLines: InvoiceLinesActions.ReloadInvoiceLines,
  });
}
```

<!-- .element: class="medium-code" -->

<br/>

In templates or component methods, you can dispatch actions easily:

```html
<button (click)="actions.reloadInvoiceLines(selectors.invoiceId())">Reload invoice lines</button>
```

<!-- .element: class="medium-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Benefits of Signals with NGXS

- Fine-grained reactivity <br/><br/>
- Better performance through reduced change detection <br/><br/>
- Type-safe state access <br/><br/>
- Improved developer experience <br/><br/>
- Easier testing <br/><br/>
- Framework-agnostic utilities

##==##

# Key Takeaways

- NGXS provides signal utilities in @ngxs/store <br/><br/>
- select for quick signal access <br/><br/>
- createSelectMap for grouped selectors <br/><br/>
- createDispatchMap for grouped actions or to declare the action <br/><br/>
- Compatible with NgRx SignalStore <br/><br/>
- Solution-agnostic approach
