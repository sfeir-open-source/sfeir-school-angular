<!-- .slide -->
# Les méthodes du service HttpClient
HttpClient vous fournit notamment les méthodes suivantes:<br><br>

- this.http.get(url, options)<br><br>
- this.http.post(url, data, options)<br><br>
- this.http.put(url, data, options)<br><br>
- this.http.delete(url, options)<br><br>

##==##
<!-- .slide: class="with-code inconsolata" -->
# L'envoie de données avec POST et PUT

- Le format des données doit être obligatoirement au format JSON<br><br>
- le troisième argument est réservé pour les entêtes<br><br>

```typescript
http.post(
   url,
   data,
   {headers: new HttpHeaders().set('Authorization', 'my-auth-token')}
);
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Déclencheur et type de retour

- Chaque méthode renvoie un observable<br><br>
- La requête vers le serveur est envoyée seulement si l'on souscrit à cet Observable<br><br>

```typescript
this.http.get(url, options).subscribe(data => { 
  console.info(data);
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Gérer ses retours

- Par défaut la réponse est au format JSON<br><br>
- Pour l'avoir en type text, dans les options `{ responseType: text }`<br><br>

```typescript
this.http.get(url, options).subscribe(data => {
  console.info(data);
});
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Et si je souhaite accéder à ma réponse complète<br>

```typescript
this.http.get(url, { observe: 'response' }).subscribe((response: HttpResponse)=> {
  const { headers, body }: HttpResponse = response;
  console.info(headers.get('X-Custom-Header'));
  console.info(body.subField);
});
```
<!-- .element: class="big-code" -->
