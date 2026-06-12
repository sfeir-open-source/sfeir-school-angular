<!-- .slide: class="transition-bg-sfeir-1" -->

# Async validation

##==##

<!-- .slide: class="with-code inconsolata" -->

# `validateHttp()` — server-backed checks

Built on `httpResource`. Runs only **after** sync validation passes:

<br/>

```typescript
form(this.usernameModel, (path) => {
  required(path.username);

  validateHttp(path.username, {
    request: ({ value }) => `/api/check-username?username=${value()}`,
    onSuccess: (res: { taken: boolean }) =>
      res.taken ? { kind: 'usernameTaken', message: 'Username already taken' } : null,
    onError: () => ({ kind: 'networkError', message: 'Could not verify username' }),
  });
});
```

<!-- .element: class="medium-code" -->

Notes:

- `request` returns a URL (HTTP GET) or a full `HttpResourceRequest`; returning `undefined` skips the call.
- `onSuccess` maps the response to an error or `null`; `onError` handles HTTP/network failures.
- For non-HTTP async sources use the lower-level `validateAsync({ params, factory, onSuccess, onError })` with any `resource`.

##==##

<!-- .slide: class="with-code inconsolata" -->

# The `pending()` state

While async validation runs, `pending()` is `true` and `valid()` is `false`:

<br/>

```angular181html
<label>
  Username
  <input [formField]="usernameForm.username" />

  @if (usernameForm.username().pending()) {
    <span class="checking">Checking availability…</span>
  }
</label>
```

<!-- .element: class="medium-code" -->

- Use `pending()` for spinners / disabling submit<br/>
- Debounce expensive checks: `validateHttp(path.x, { ..., debounce: 500 })`

Notes:

- `valid()` stays `false` while pending (we don't yet know the result), but `invalid()` only becomes `true` if there are actual errors. This distinction matters when enabling/disabling the submit button.
