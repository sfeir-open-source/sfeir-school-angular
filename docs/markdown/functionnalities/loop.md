<!-- .slide: class="sfeir-basic-slide with-code" -->
# L'itération avec la directive *ngFor
<ul>
    <li>Itère dans une collection et génère un template par élément</li><br>
    <li><strong>index, odd, even, last</strong> à utiliser en alias dans des variables</li>
</ul>
<br><br>
```typescript
<ul>
   <li *ngFor="let fruit of fruits; let i=index">
       {{ i }} : {{ fruit.name }}
   </li>
</ul>
```
<!-- .element: class="big-code" -->
