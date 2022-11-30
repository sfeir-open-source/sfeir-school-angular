<!-- .slide -->
# Définition et cas d'utilisation

- Responsable du layout
- Manipule les éléments du DOM (ajout, suppression, etc)
- S'applique sur un 'host' élément
- Facilement reconnaissable grâce à l'asterix (ex: *ngIf)
- Une seule directive structurelle par élément 'host'

##==##

<!-- .slide-->
# * une microsyntaxe

- Permet une lecture plus simple, et réduit la verbosité
- Le mot clé __let__ permet de déclarer une variable utilisée dans le template
- Lorsque la variable n'est pas définie, il utilise le context implicite : $implicit

##==##

<!-- .slide: class="with-code inconsolata" -->
# *ngFor en profondeur

```html
<div *ngFor="let hero of heroes; let odd = odd; index as i"></div>
```
<!-- .element: class="big-code" -->
<br/><br/>

```html
<ng-template let-hero [ngForOf]="heroes" let-odd="odd" let-i="index"></ng-template>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="sfeir-basic-slide" -->
# Récapitulatif de la grammaire
<span class="bold important">*:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )*"</span>
<br/><br/><br/>
<table>
    <t-body>
        <tr>
            <th>prefix</th>
            <th>clé d'attribut html</th>
        </tr>
         <tr>
            <th>key</th>
            <th>clé d'attribut html</th>
        </tr>
         <tr>
            <th>local</th>
            <th>variable locale utilisée dans le template</th>
        </tr>
         <tr>
            <th>export</th>
            <th>variable exportée par la directive sous un certain nom</th>
        </tr>
         <tr>
            <th>expression</th>
            <th>expression standard angular</th>
        </tr>
    </t-body>
</table>
