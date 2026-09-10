# What's still missing

The Staff Directory can already list people, add one through a dialog, and delete one — all driven by signals and the merged RxJS stream from `11-http`. One thing is still missing: a **detail page**.

<br/><br/>

Click on a person → land on `/people/:id` → see their info pre-filled in the same `SignalForm` you built in `14-signal-form` → edit it → save.

##==##

# Not a new API — a new way of composing them

`apps/15-reactive-thinking` is less about learning one new function and more about **wiring reactive primitives together**:

<br/><br/>

- a route parameter that becomes a signal **input**<br/><br/>
- an HTTP call that becomes a **resource**<br/><br/>
- a form that must **reset itself** whenever the resource feeding it produces a new value

<br/>

> This is the training's integration milestone — every piece is something you already know. The skill being tested is composing them correctly, end to end.

<!-- .element: class="important center" -->

##==##

# The chain, end to end

<br/>

```
URL /people/42
      │  matched by the router
      ▼
component input  `id = '42'`         ← withComponentInputBinding()
      │
      ▼
resource( params: id, stream: getPerson(id) )   ← rxResource()
      │
      ▼
resource.value()  =  Person
      │
      ▼
linkedSignal( person() ?? emptyDefaults )        ← writable, resettable model
      │
      ▼
form(model, schema)                              ← the SignalForm you already built
```

<!-- .element: class="medium-code center" -->

<br/><br/>

Notes:

- Each arrow in this chain is a concept from this training used together, in sequence, for the first time: routing → resources → linkedSignal → forms.
- We'll walk this chain top to bottom, one link at a time, over the next slides.
