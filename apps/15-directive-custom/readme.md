# Exercise 15-directive-custom (folder apps/15-directive-custom)

In this workshop, you'll learn how to create your own custom directive in Angular. We'll create a badge directive that shows a manager icon when a person is marked as a manager.

We'll also introduce the concept of input aliasing to reduce boilerplate in your templates when using this directive.

## Step 1: Create Directives Directory

In the `shared` folder, create a new directory called `directives`. This is where we'll place our custom directives.

## Step 2: Generate Badge Directive

Create a new directive called `Badge` in the `directives` folder.

## Step 3: Add Input with Alias

In your `BadgeDirective`, add an input property called `isManager` and alias it as `sfeirBadge`.

## Step 4: Inject Required Services

In the `BadgeDirective` inject the following services:

- `ElementRef<HTMLElement>` as `elementRef`
- `Renderer2` as `renderer2`

## Step 5: Implement the Badge Logic

Use the `effect` function to react to changes in the `isManager` input. When `isManager` is true, display a manager icon using Material Icons.

## Step 6: Use the Directive in Template

In the `people.component.html` file, add the `sfeirBadge` directive to the person's name in list view mode:

```html
<span [sfeirBadge]="person.isManager"></span>
```

Place this span right after the `h3` tag that displays the person's name.

## Step 7: Test Your Work

To see your custom directive in action, run the application with:

```bash
npm run client -- 15-directive-custom
```

## Troubleshooting

- If you don't see the icon, make sure Material Icons is properly imported in your `index.html`
- Check the browser console for any errors
- Verify that the `isManager` property is correctly set in your person objects

Happy coding! 🚀
