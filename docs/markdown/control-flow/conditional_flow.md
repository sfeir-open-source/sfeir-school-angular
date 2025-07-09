# A control flow directly in the framework

Since Angular 17, Angular's control flow is an integral part of the framework and the templating compiler:
<br/><br/>

- increased performance <br/><br/>
- removal of NgIf, NgFor, NgSwitch imports<br/><br/>
- lighter bundle

##==##

<!-- .slide: class="with-code inconsolata" -->

# Migrating from ngIf to @if block

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
# Migrating from ngFor to @for block

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
<ul>
@for( user of users$ | async; track user.id) {
  <li>{{ user.name }}</li>
}
</ul>
```
<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code inconsolata" -->
# Implicit variables of the for loop


|Variable| Meaning of the variable                                                 |
|-------|------------------------------------------------------------------------------|
|$count| Number of items in the list                                                |
|$index| Index of the item in the list                                              |
|$first| First item in the list                                                   |
|$last| Last item in the list                                                   |
|$even| Even index                                                                   |
|$odd| Odd index                                                                 |
|$track| Tracking function or tracking value (mandatory with @for syntax) |

<br/>

Each variable can be aliased with the 'let' keyword
<!-- .element: class="important" -->


##==##

<!-- .slide: class="with-code inconsolata" -->
# Migrating from ngSwitch to @switch block

**Before**

```angular2html
<div [ngSwitch]="(user$ | async)?.role">
  <div *ngSwitchCase="'admin'">Admin</div>
  <div *ngSwitchCase="'user'">User</div>
  <div *ngSwitchDefault>Guest</div>
</div>
```

**After**

```angular17html
@if (user$ | async; as user) {
  @switch(user.role) {
    @case('admin') {
      <div>Admin</div>
    }
    @case('user') {
      <div>User</div>
    }
    @default {
      <div>Guest</div>
    }
  }
}
```

##==##

<!-- .slide: class="with-code inconsolata" -->
# Automatic migration using a simple command

<br/><br/><br/>

  ```bash
ng generate @angular/core:control-flow
```
<!-- .element: class="big-code center" -->
