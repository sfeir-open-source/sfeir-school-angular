<!-- .slide: class="sfeir-basic-slide" -->
# Les méthodes du service HttpClient
<br>
HttpClient vous procure les méthodes suivantes:<br><br>
- this.http.get(url, options)<br><br>
- this.http.post(url, data, options)<br><br>
- this.http.put(url, data, options)<br><br>
- this.http.delete(url, options)<br><br>

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# L'envoie de données avec POST et PUT
<br><br>
<ul>
    <li>Le format des données doit être obligatoirement en format JSON</li><br>
    <li>Le troisième argument est réservé pour les entêtes</li>
</ul>
<br><br>
```typescript
http.post(
   url,
   datas,
   {headers: new HttpHeaders().set('Authorization', 'my-auth-token')}
);
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Déclencheur et type de retour
<br><br>
<ul>
    <li>Chaque méthode renvoie un observable</li><br>
    <li>La requête vers le serveur est envoyé seulement si l'on souscrit à cet observable</li>
</ul>
<br><br>
```typescript
this.http.get(url, options).subscribe(datas => { 
  console.info(datas);
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
# Gérer ses retours
<br><br>
<ul>
    <li>Par défaut la réponse est sous format JSON</li><br>
    <li>Pour l'avoir en type text, dans les options { responseType: text }</li>
</ul>
<br><br>
```typescript
this.http.get(url, options).subscribe(datas => {
  console.info(datas);
});
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide with-code" -->
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
