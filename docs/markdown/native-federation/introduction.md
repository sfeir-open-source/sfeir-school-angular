# Native Federation: What is it?

Native Federation is an emerging concept that uses native browser features to manage micro-interfaces. This implies:<br/><br/>

- no need for webpack or any other module bundler <br/><br/>
- a micro-frontend is actually an ESM module <br/><br/>
- uses ESM to import modules <br/><br/>
- framework-agnostic

##==##

# Module Federation: What is it?

Module Federation is a Webpack 5 feature that allows for dynamic loading of modules. The key characteristics of Module Federation are as follows:<br/><br/>

- __Dynamism__: allows importing modules from other applications without recompilation at runtime <br/><br/>
- __Dependency Sharing__: allows sharing dependencies between multiple modules <br/><br/>
- __Isolation__: each module can be developed independently of the others <br/><br/>
- __Performance__: reduces the size of the main bundle
