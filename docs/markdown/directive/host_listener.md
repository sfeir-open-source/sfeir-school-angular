<!-- .slide: class="transition-bg-grey-1 underline" -->

# Host Listener

##==##

<!-- .slide-->

# Host Listener: Définition

- Permet d'écouter un événement du DOM et d'appeler un callback <br><br>
- Décorateur @HostListener()

##==##

<!-- .slide: class="inconsolata with-code" -->

# Host Listener: Exemple

```typescript
@Directive({ selector: '[blDragAndDrop]' })
export class DragAndDropDirective {
    constructor() { }

    @HostListener('drop', [ '$event' ])
    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer) {
            const fileToUpload = event.dataTransfer.files.item(0);
            this.onFileUpload$.emit(fileToUpload);
        }
    }
}
```

<!-- .element: class="big-code" -->

##==##

# Host Listener / Host Binding: une seconde écriture

<br>

- Une deuxième écriture est possible <br><br>
- Utilisée principalement par des librairies de composants <br><br>
- Ne pas mixer les deux écritures

##==##

<!-- .slide: class="inconsolata with-code" -->

# Un exemple plus compréhensible

```typescript
@Directive({
    selector: "[appAddIcon]",
    host: {
        "[class.test]": "isGood",
        "(click)": "onClick($event)"
    }
})
export class AddIconDirective implements OnInit {
    isGood: boolean;

    constructor() {}

    ngOnInit(): void {
        this.isGood = false;
    }

    onClick(event: Event) {
        console.log(event);
    }
}
```

<!-- .element: class="small-code" -->
