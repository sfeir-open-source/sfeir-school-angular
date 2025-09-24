# Training Information

For your convenience, please note the following: <br/><br/>

- Scheduled breaks will be announced during the session
- A round table discussion is planned for knowledge sharing

##==##

# Training Resources

<br/><br/>

### Training Materials

- **Presentation Slides**  
  [https://sfeir-open-source.github.io/sfeir-school-angular](https://sfeir-open-source.github.io/sfeir-school-angular)

<br/><br/>

### Source Code Repository

- **Exercise Files**  
  [https://github.com/sfeir-open-source/sfeir-school-angular](https://github.com/sfeir-open-source/sfeir-school-angular)

##==##

![](assets/images/school/basics/sfeir_people.png 'center')

##==##

<!-- .slide: class="with-code inconsolata" -->

# Environment Setup

### 1. Clone the Repository

```shell
git clone https://github.com/sfeir-open-source/sfeir-school-angular.git
cd sfeir-school-angular
```

<!-- .element: class="medium-code" -->

<br/>

### 2. Install Dependencies

```shell
# Using npm install or CI mode
npm install
# OR for reproducible builds
npm ci
```

<!-- .element: class="medium-code" -->

<br/>

### 3. Start Development Environment

To launch a specific workshop:

```shell
# Replace 'workshop_name' with the actual workshop name
npm run client -- "workshop_name"
```

<!-- .element: class="medium-code" -->

<br/>

### 4. Start Mock API Server

```shell
# Run this in a separate terminal
npm run server:start
```

<!-- .element: class="medium-code" -->

##==##

# Workshop Structure

Each Angular concept is reinforced through hands-on labs following this structure:

<br/>

### Lab Components

- **Exercise Files**: Located in: `apps/workshop_name`
- **Reference Solutions**: Available in: `apps/workshop_name-solution`

<br/><br/>

### Learning Approach

- Work through exercises in the designated workshop directory
- Refer to the solution files if you need guidance
- Each lab builds upon previous concepts to reinforce learning
