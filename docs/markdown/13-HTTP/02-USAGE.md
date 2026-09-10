<!-- .slide -->

# `HttpClient` methods

Among others:<br/><br/>

- `this.http.get(url, options)`<br/><br/>
- `this.http.post(url, data, options)`<br/><br/>
- `this.http.put(url, data, options)`<br/><br/>
- `this.http.patch(url, data, options)`<br/><br/>
- `this.http.delete(url, options)`<br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# Every method returns an `Observable`

- Each `HttpClient` method returns an `Observable` — it does **not** return the value itself.
- The request is only sent to the server once something **subscribes** to that Observable.<br/><br/>

```typescript
// core/provider/people.ts
getPeople(): Observable<Person[]> {
  return this.http.get<Person[]>(People.baseUrl); // no request sent yet!
}

// somewhere downstream, e.g. in a component:
this.peopleService.getPeople().subscribe(people => console.info(people));
```

<!-- .element: class="medium-code" -->

Notes:

- This is the single most common source of "nothing happens" bugs with `HttpClient`: building the Observable is not the same as sending the request.
- `getPeople()` in `apps/11-http` returns exactly what `HttpClient.get()` gives back — no `.subscribe()` inside the service itself, that's the caller's job.

##==##

<!-- .slide: class="with-code inconsolata" -->

# Sending data: `POST` / `PUT` / `DELETE`

```typescript
// core/provider/people.ts
removePerson(id: string): Observable<Person[]> {
  return this.http.delete<Person[]>(`${People.baseUrl}/${id}`);
}
```

<!-- .element: class="medium-code" -->

- Data is typically sent/received as JSON, parsed automatically.<br/><br/>
- A third argument is available for request options (headers, params, `observe: 'response'` for the full response, `responseType: 'text'`...).
