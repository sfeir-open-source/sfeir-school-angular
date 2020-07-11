<!-- .slide -->
# Les méthodes du service HttpClient
<br><br>
HttpClient vous procure les méthodes suivantes:<br><br>

- this.http.get(url, options)<br><br>
- this.http.post(url, data, options)<br><br>
- this.http.put(url, data, options)<br><br>
- this.http.delete(url, options)<br><br>

##==##
<!-- .slide: class="with-code inconsolata" -->
# L'envoie de données avec POST et PUT
<br><br>

- Le format des données doit être obligatoirement en format JSON<br><br>
- le troisième argument est réservé pour les entêtes<br><br>

```typescript
http.post(
   url,
   datas,
   {headers: new HttpHeaders().set('Authorization', 'my-auth-token')}
);
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Déclencheur et type de retour
<br><br>

- Chaque méthode renvoie un observable<br><br>
- Le requête vers le serveur est envoyée seulement si l'on souscrit à cet obervable<br><br>

```typescript
this.http.get(url, options).subscribe(datas => { 
  console.info(datas);
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Gérer ses retours
<br><br>

- Par défaut le réponse est sous format JSON<br><br>
- Pour l'avoir en type textt, dans les options { responseType: text }<br><br>

```typescript
this.http.get(url, options).subscribe(datas => {
  console.info(datas);
});
```
<!-- .element: class="big-code" -->

##==##
<!-- .slide: class="with-code inconsolata" -->
# Et si je souhaite accéder à ma réponse complète
<br><br><br>

```typescript
this.http.get(url, { observe: 'response' }).subscribe((response: HttpResponse)=> {
  const { headers, body }: HttpResponse = response;
  console.info(headers.get('X-Custom-Header'));
  console.info(body.subField);
});
```
<!-- .element: class="big-code" -->
