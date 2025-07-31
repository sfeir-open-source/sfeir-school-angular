# Dynamic Component Loading

- TemplateRef <br/><br/>
- ViewContainerRef

##==##

# Modern Dynamic Components

- In modern Angular, creating components dynamically is much simpler. <br/><br/>
- `ComponentFactoryResolver` and the `entryComponents` array are **deprecated**. <br/><br/>
- You can now create components directly using the `ViewContainerRef` service without a factory.

##==##

# The ViewContainerRef service

- Represents a container where one or more views can be attached.
- It's the key to creating dynamic components and embedded views.
- Has several methods:
  - **clear**: destroys all views in the container
  - **createComponent**: instantiates a component and inserts it into the container.
  - **createEmbeddedView**: instantiates an embedded view from a `TemplateRef`.
  - **get**: retrieves a view from its container
  - **insert**: inserts a view into its container
  - **move**: moves a view within its container
  - **remove**: removes a view from its container
  - **detach**: detaches a view from its container without destroying it
  - **indexOf**: gets the index of the view

##==##

# The TemplateRef service

- Represents an embedded template that can be used to instantiate embedded views. <br/><br/>
- You get a `TemplateRef` instance by placing an `<ng-template>` element in your template. <br/><br/>
- It is used with `ViewContainerRef.createEmbeddedView()` to create and render the view.
