# Un control flow directement au framework

Depuis Angular 17, le control flow d'Angular fait part intégrante du framework et du compilo de templating:
<br/><br/>

- performance accrue <br/><br/>
- suppression des imports NgIf NgFor NgSwitch<br/><br/>
- bundle plus léger

##==##

<!-- .slide: class="with-code inconsolata" -->

# Migration ngIf vers @if block

**Before**

```angular2html
<div *ngIf="user$ | async as user">
  <!-- content to display if user exist -->
</div>
```
<!-- .element: class="big-code" -->

<br/><br/>

**After**

```angular17html
@if(user$ |async; as user) {
  <div>
    <!-- content to display if user exist -->
  </div>
}
```
<!-- .element: class="big-code" -->


##==##

<!-- .slide: class="with-code inconsolata" -->
# Migration ngFor vers @for block

**Before**

```angular2html
<ul *ngFor="let user of users$ | async trackBy: trackByFn">
  <li>{{ user.name }}</li>
</ul>
```
<!-- .element: class="big-code" -->

<br/>

**After**

```angular17html
@for( user of user$ |async; track user.id) {
  <ul>
    <li>{{ user.name }}</li>
  </ul>
}
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Variable implicite de la boucle for


|Variable| Signification de la variable                                                 | 
|-------|------------------------------------------------------------------------------|
|$count| Nombre d'élement dans la list                                                |
|$index| Index de l'élement dans la list                                              |
|$first| Premier élement de la list                                                   |
|$last| Dernier élement de la list                                                   |
|$even| Index pair                                                                   |
|$odd| Index impair                                                                 |
|$track| Function de tracking ou valeur de tracking (obligatoire avec la syntax @for) |

<br/>

Chaque variable peut être aliasé avec le mot clé 'let'
<!-- .element: class="important" -->


##==##

<!-- .slide: class="with-code inconsolata" -->
# Migration ngSwitch vers @switch block

**Before**

```angular2html
<div [ngSwitch]="user$ | async as user">
  <div *ngSwitchCase="user.role === 'admin'">Admin</div>
  <div *ngSwitchCase="user.role === 'user'">User</div>
  <div *ngSwitchDefault>Guest</div>
</div>
```

**After**

```angular17html
@switch(user$ | async; as user) {
  @case(user.role === 'admin') {
    <div>Admin</div>
  }
  @case(user.role === 'user') {
    <div>User</div>
  }
  @default {
    <div>Guest</div>
  }
}
```

##==##

<!-- .slide: class="with-code inconsolata" -->
# Migration automatique à l'aide d'une simple commande

<br/><br/><br/>

  ```bash
ng generate @angular/core:control-flow
```
<!-- .element: class="big-code center" -->


