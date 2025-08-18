# Why create a library?

<br/><br/>

- share logic between multiple projects <br/><br/>
- abstract away complexity within the same project <br/><br/>

##==##

# Official definition of a library?

An Angular library is a collection of components, services, and other elements that can be shared between multiple Angular applications. <br/><br/>
There are several types of Angular libraries, each with its own characteristics and use cases:
<br/><br/>

- component library <br/><br/>
- helper library <br/><br/>
- business logic library <br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# How to create a library with Angular?

The Angular CLI will be your best ally for creating an Angular library. <br/><br/>

```shell
ng new sfeir-library-workspace  --no-create-application
```

<!-- .element: class="big-code" -->

<br/><br/>

Then, in the sfeir-library-workspace folder, run the following command to create a library:

<br/><br/>

```shell
ng generate library sfeir-components
```

<!-- .element: class="big-code" -->

##==##

# Why create a workspace?

<br/><br/>

A workspace makes more sense when creating an Angular library as it can contain multiple libraries. <br/><br/>
This workspace can also contain Angular applications to test your libraries in a real context. <br/><br/>

##==##

<!-- .slide: class="with-code inconsolata" -->

# An Angular.json that has changed a lot

```json
{
  "projects": {
    "sfeir-components": {
      "root": "projects/sfeir-components",
      "sourceRoot": "projects/sfeir-components/src",
      "projectType": "library",
      "prefix": "lib",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:ng-packagr"
        }
      }
    }
  }
}
```

<!-- .element: class="small-code" -->

<br/><br/>

The code for your library is located in the projects/sfeir-components/src folder. <br/><br/>
