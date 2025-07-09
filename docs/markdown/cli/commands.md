<!-- .slide: class="with-code inconsolata" -->

# Command: Create a project

```sh
ng new my-awesome-app
```

<!-- .element: class="big-code" -->

<br/><br/>

-   Initializes an entire project, ready for production <br/><br/>
-   Initializes a GIT repo, with a first commit (an option that can be disabled)<br/><br/>
-   Installs dependencies (you can choose between npm and yarn as a package manager)<br/><br/>

Notes:
-   This command has many more options, such as the choice of style extension (scss, css, sass, ...). You can also choose whether or not to install routing

##==##

<!-- .slide: class="with-code inconsolata" -->

# Command: Create a component

```sh
ng generate component user
```

<!-- .element: class="big-code" -->
<br/>

-   This command generates the following files:<br/><br/>
    - src/app/user/user.component.ts<br/><br/>
    - src/app/user/user.component.html<br/><br/>
    - src/app/user/user.component.css<br/><br/>
    - src/app/user/user.component.spec.ts<br/><br/>

Notes:
-   the style extension depends on the choice you made when initializing your project
-   You can skip creating the test file by using the `skipTests` option.
-   A shorter command with an alias exists: ng g component user
-   Warning: if the module option is not specified, the component will be imported into the root module

##==##

<!-- .slide: class="with-code inconsolata" -->

# Command: Create a service

```sh
ng generate service user
```

<!-- .element: class="big-code" -->

<br/>

-   This command generates the following files:<br/><br/>
    - src/app/user.service.ts<br/><br/>
    - src/app/user.service.spec.ts<br/><br/>

Notes:
-   If we type the command ng generate service shared/user, the CLI will create the same files as before but in the shared folder
-   A shortcut for this command exists: ng g service user

##==##

<!-- .slide: class="full-center"  -->
# What else can we generate? 

![h-800](assets/images/school/cli/generate_helper.png)
