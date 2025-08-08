# Exercise 24: HTTP Interceptors in Angular (folder apps/24-interceptor)

In this workshop, you'll implement an HTTP interceptor to automatically add an authorization header to all outgoing HTTP requests. Interceptors are a powerful feature in Angular's HTTP client that allow you to intercept and modify HTTP requests and responses.

## Step 1: Understand HTTP Interceptors

Interceptors provide a way to:

- Add authentication tokens to outgoing requests
- Log HTTP activity
- Handle errors globally
- Transform request/response data
- Implement caching strategies

In modern Angular (v15+), interceptors are implemented as functions with the `HttpInterceptorFn` type, which is more efficient and tree-shakable than the older class-based approach.

## Step 2: Create the Interceptor

1. Create a new file in the `src/app/core/interceptors` directory named `core-interceptors.ts`

2. Implement the token interceptor function

3. This interceptor:
   - Takes the original request and creates a clone of it
   - Adds an `Authorization` header with the value `Bearer SFEIR`
   - Passes the modified request to the next handler in the chain

## Step 3: Register the Interceptor

1. Open `main.ts` and import the interceptor and necessary functions:

2. Register the interceptor in the application bootstrap providers:

## Step 4: Verify in the Application

1. Run the application:

   ```bash
   npm run client -- 24-interceptor
   ```

2. Open your browser's developer tools and navigate to the Network tab

3. Interact with the application to trigger HTTP requests

4. Observe that each request now includes the `Authorization: Bearer SFEIR` header

## Understanding Interceptor Order

When using multiple interceptors, they are applied in the order they are provided:

```typescript
provideHttpClient(
  withInterceptors([
    firstInterceptor, // Applied first and get the response last
    secondInterceptor, // Applied second and get the response second
    thirdInterceptor, // Applied third and get the response first
  ]),
);
```

The request flows through the interceptors in order (1→2→3), while the response flows in reverse order (3→2→1).

## Advanced Interceptor Techniques

1. **Conditional Interception**: Only modify certain requests based on URL or other criteria

   ```typescript
   if (request.url.includes('/api/secure')) {
     // Add headers only for secure endpoints
   }
   ```

2. **Response Transformation**: Transform response data before it reaches components

   ```typescript
   return next(request).pipe(
     map(event => {
       // Transform response events
       return event;
     }),
   );
   ```

3. **Error Handling**: Catch and handle HTTP errors globally
   ```typescript
   return next(request).pipe(
     catchError(error => {
       // Handle error
       return throwError(() => error);
     }),
   );
   ```

## Troubleshooting

- If your interceptor isn't being applied, check that it's correctly registered in the providers
- Verify that the interceptor is returning the result of `next(clonedRequest)`
- Check the browser console for any errors
- Use the browser's Network tab to confirm headers are being added correctly

By completing this workshop, you've learned how to create and register HTTP interceptors in Angular to automatically add authentication headers to all outgoing requests.
