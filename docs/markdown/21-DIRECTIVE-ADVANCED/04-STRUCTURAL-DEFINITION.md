<!-- .slide -->

# Definition and use cases

- Responsible for the layout <br/><br/>
- Manipulates DOM elements (add, remove, etc.) <br/><br/>
- Applies to a 'host' element <br/><br/>

##==##

# Grammar Summary

<span class="inconsolata">:prefix="( :let | :expression ) (';' | ',')? ( :let | :as | :keyExp )\_"

<!-- .element: class="important" -->

<br/><br/><br/>

| Term       | Description                                             |
| ---------- | ------------------------------------------------------- |
| prefix     | HTML attribute key                                      |
| key        | HTML attribute key                                      |
| local      | Local variable used in the template                     |
| export     | Variable exported by the directive under a certain name |
| expression | Standard Angular expression                             |

##==##

<!-- .slide: class="with-code inconsolata" -->

# Example of a structural directive

```angular181html
<input *secret="let type" [type]="type"/>
```

<!-- .element: class="big-code" -->
