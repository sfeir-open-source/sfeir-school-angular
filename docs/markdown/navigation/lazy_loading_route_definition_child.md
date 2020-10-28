<!-- .slide: class="sfeir-basic-slide with-code" -->
# Définiton dans les routes dans le module enfant

```typescript
const peopleModuleRoutes: Routes = [
{ path: '', component: PeopleComponent },
{ path: ':id', component: ConsultPersonComponent },
{ path: 'update/:id', component: EditPersonComponent}];

@NgModule({
  imports: [RouterModule.forChild(peopleModuleRoutes)],
  declarations: [PeopleComponent, ConsultPersonComponent, EditPersonComponent]
})
export class PeopleModule {}
```


<!-- .element: class="big-code" -->


