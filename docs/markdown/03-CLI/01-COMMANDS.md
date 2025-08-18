<!-- .slide: class="with-code inconsolata" -->

# Modern way to manage the cli

### Basics way to install the CLI

```shell
npm install -g @angular/cli
```

<!-- .element: class="big-code" -->

<br/><br/>

### Modern way to manage the CLI

> Use your favorite package runner to execute the CLI

- npx
- yarn
- pnpm
- bun

##==##

<!-- .slide: class="with-code inconsolata" -->

# Command: Create a project

In a terminal, run the following command:

```shell
ng new my-awesome-app

# or with your favorite package runner

npx @angular/cli new my-awesome-app
```

<!-- .element: class="big-code" -->

<br/><br/>

- Initializes an entire project, ready for production
- Initializes a GIT repo, with a first commit (an option that can be disabled)
- Installs dependencies (you can choose between npm and yarn as a package manager)

Notes:

- This command has many more options, such as the choice of style extension (scss, css, sass, ...). You can also choose whether or not to install routing

##==##

<!-- .slide: class="with-code inconsolata" -->

# Command: Create a component

```sh
ng generate component user
# or with your favorite package runner
npx @angular/cli generate component user
```

<!-- .element: class="big-code" -->
<br/>

- This command generates the following files:<br/><br/>
  - src/app/user/user.ts<br/><br/>
  - src/app/user/user.html<br/><br/>
  - src/app/user/user.css<br/><br/>
  - src/app/user/user.spec.ts<br/><br/>

Notes:

- the style extension depends on the choice you made when initializing your project
- You can skip creating the test file by using the `skipTests` option.
- A shorter command with an alias exists: ng g component user
- Warning: if the module option is not specified, the component will be imported into the root module

##==##

<!-- .slide: class="with-code inconsolata" -->

# Command: Create a service

```shell
ng generate service user
# or with your favorite package runner
npx @angular/cli generate service user
```

<!-- .element: class="big-code" -->

<br/>

- This command generates the following files:<br/><br/>
  - src/app/user.ts<br/><br/>
  - src/app/user.spec.ts<br/><br/>

Notes:

- If we type the command ng generate service shared/user, the CLI will create the same files as before but in the shared folder
- A shortcut for this command exists: ng g service user

##==##

<!-- .slide: class="full-center"  -->

# What else can we generate?

![h-800](assets/images/school/cli/generate_helper.png)
