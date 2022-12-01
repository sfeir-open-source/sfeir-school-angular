<!-- .slide: class="with-code inconsolata" -->
# L'itération avec la directive *ngFor
- Itère dans une collection et génère un template par élément<br/><br/>
- <b>index, odd, event, last</b> à utiliser en alias dans des variables<br/><br/>

```html
<ul>
   <li *ngFor="let fruit of fruits; let i=index">
       {{ i }} : {{ fruit.name }}
   </li>
</ul>
```
<!-- .element: class="big-code" -->
