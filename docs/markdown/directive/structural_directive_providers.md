# Dynamic Component Loading

- TemplateRef
- ViewContainerRef

##==##

# Modern Dynamic Components

- In modern Angular, creating components dynamically is much simpler.
- `ComponentFactoryResolver` and the `entryComponents` array are **deprecated**.
- You can now create components directly using the `ViewContainerRef` service without a factory.

##==##

# The ViewContainerRef service

- Represents a container where one or more views can be attached.
- It's the key to creating dynamic components and embedded views.
- Has several methods:
    - __clear__: destroys all views in the container
    - __createComponent__: instantiates a component and inserts it into the container.
    - __createEmbeddedView__: instantiates an embedded view from a `TemplateRef`.
    - __get__: retrieves a view from its container
    - __insert__: inserts a view into its container
    - __move__: moves a view within its container
    - __remove__: removes a view from its container
    - __detach__: detaches a view from its container without destroying it
    - __indexOf__: gets the index of the view

##==##

# The TemplateRef service

- Represents an embedded template that can be used to instantiate embedded views.
- You get a `TemplateRef` instance by placing an `<ng-template>` element in your template.
- It is used with `ViewContainerRef.createEmbeddedView()` to create and render the view.
