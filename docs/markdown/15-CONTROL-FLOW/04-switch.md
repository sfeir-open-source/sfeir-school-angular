<!-- .slide: class="with-code inconsolata" data-type-show="on-stage" -->

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

<!-- .slide: class="with-code inconsolata" data-type-show="modern-2days" -->

# @switch block

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
