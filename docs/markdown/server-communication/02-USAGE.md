<!-- .slide -->

# HttpClient Service Methods

HttpClient provides the following methods, among others:<br/><br/>

- `this.http.get(url, options)`<br/><br/>
- `this.http.post(url, data, options)`<br/><br/>
- `this.http.put(url, data, options)`<br/><br/>
- `this.http.patch(url, data, options)`<br/><br/>
- `this.http.delete(url, options)`<br/><br/>
- ...

##==##

<!-- .slide: class="with-code inconsolata" -->

# Sending Data with POST/PUT/PATCH

- Data is typically sent in JSON format.<br/><br/>
- The third argument is reserved for request options (headers, parameters, etc.).<br/><br/>

```typescript
import { HttpClient, HttpHeaders } from '@angular/common/http';
function postData(url: string, data: any): Observable<T> {
  return this.http.post<T>(
    url,
    data,
    { headers: new HttpHeaders().set('Authorization', 'my-auth-token') },
    // Shorthand: { headers: { 'Authorization': 'my-auth-token' } }
  );
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Trigger and Return Type

- Each method returns an Observable.<br/><br/>
- The request is only sent to the server if you subscribe to this Observable.<br/><br/>

```typescript
this.http.get<T>(url, options).subscribe(data => {
  console.info(data);
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# Managing Responses

- By default, the response body is parsed as JSON.<br/><br/>
- To get it as plain text, use the option: `{ responseType: 'text' }`.<br/><br/>

```typescript
this.http.get(url, { responseType: 'text' }).subscribe(data => {
  console.info(data);
});
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to Access the Full Response

To access the full HTTP response including headers, use the `{ observe: 'response' }` option.

```typescript
import { HttpResponse } from '@angular/common/http';

this.http.get<T>(url, { observe: 'response' }).subscribe((response: HttpResponse<T>) => {
  const headers = response.headers;
  const body = response.body;
  console.info(headers.get('X-Custom-Header'));
  console.info(body);
});
```

<!-- .element: class="big-code" -->
