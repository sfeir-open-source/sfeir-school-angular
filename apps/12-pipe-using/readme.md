# Exercise 12-pipe-using (dossier apps/12-pipe-use)

# Angular Pipes Exercise

## Objective

In this exercise, you'll learn how to use Angular's built-in pipes to format data displayed in your templates. Specifically, you'll format a date of birth to make it more readable for users.

## Learning Outcomes

By the end of this exercise, you'll be able to:

- Understand what Angular pipes are and their purpose
- Use built-in Angular pipes in templates
- Format dates using Angular's date pipe
- Learn the pipe syntax in Angular templates

## Prerequisites

- Understanding of Angular components
- Basic knowledge of Angular templates
- Familiarity with Angular modules

## Exercise Steps

### Step 1: Import the DatePipe

1. Open the `card.component.ts` file
2. In the imports array, add the DatePipe

### Step 2: Apply the Date Pipe

Now that we have access to Angular's built-in pipes, we can use the date pipe to format the birthdate:

1. Open the `card.component.html` file
2. Find the birthDate display section in the template
3. Modify it to use the date pipe with the format 'dd/MM/yyyy':

The pipe syntax uses the `|` character followed by the pipe name and any parameters the pipe accepts. In this case, we're using the format 'dd/MM/yyyy' as a parameter for the date pipe.

## Testing Your Implementation

To test your implementation, run the application:

```bash
npm run client -- 12-pipe-using
```

Verify that:

- The person card shows the birthdate formatted as day/month/year (e.g., "25/12/1990")
- The date format follows the European standard with day first, then month, then year

## Key Concepts

### Angular Pipes

Pipes in Angular are simple functions that accept an input value and return a transformed value. They are used in template expressions to transform data before displaying it to the user.

### Pipe Syntax

The basic syntax for using pipes in Angular templates is:

```
{{ value | pipeName:parameter1:parameter2:... }}
```

Where:

- `value` is the expression to be transformed
- `pipeName` is the name of the pipe
- `parameter1`, `parameter2`, etc. are optional parameters passed to the pipe

### Built-in Pipes

Angular provides several built-in pipes, including:

- `DatePipe`: Formats dates according to locale rules or custom formats
- `UpperCasePipe`: Transforms text to uppercase
- `LowerCasePipe`: Transforms text to lowercase
- `CurrencyPipe`: Transforms a number to a currency string
- `DecimalPipe`: Transforms a number to a decimal string
- `PercentPipe`: Transforms a number to a percentage string

### Pipe Chaining

Pipes can be chained together to apply multiple transformations:

```
{{ value | pipe1 | pipe2 | pipe3 }}
```

The output of each pipe becomes the input to the next pipe in the chain.

## Troubleshooting

- **No Pipe Found**: Make sure the CommonModule is imported in your module
- **Incorrect Format**: Check the format string passed to the date pipe
- **Date Isn't Displayed**: Ensure the date value is a valid date object or string
