## Unit Project #3: Single Page App

This project is to build a single page app by Sam, where I will use my Javascript knowledge and apply things I've learnt in the course.

### What is my idea?

Let's talk about cute Animals, even better Aussie animals. We are so lucky to have a huge range of native animals living here with us, they make money for us, they bring in tourists for us, they act cute just to make our life better. So there is no reason we shouldn't protect them, some of them will be gone if we don't do anything now.

That's where my idea came through. Many individuals, companies, and charities around the world would like to contribute money to those adorable Aussie animals. We want to love them, to save them, and to feed them, but there are many needed animals, who do we choose each month? So it will be your money, your choice.

Users can come to my app to make decisions on which animal(s) they would like to protect this month, the top three will get the contributions from all those lovely people who voted.

Those three who has been helped this month won't be in the run for next three months, so it will give others a fair chance, so everybody is a winner.


### How does my SPA function?

1. It fetches photos from an instagram account, and the images will render in the page
2. It will display names and where those animals are from
3. Based on the location, it will tell you the weather in that location at the time (fetch data from the Dark Sky Forecast API)
4. Based on the weather received, it will display a related weather icon to be more visible/interesting
5. When users click on each animal/image, a pop up of the clicked animal will show
5. Users can vote for the animal(s) they like using a star rating system, also they can create a comment
6. The rated stars and comments will show below for users to read
6. Users can edit comment(s) they submitted, also they can delete the comment(s)
7. Based on the total stars the animal got from all the users' inpput, it will tell you how many scores the animal has got so far
8. Different overall comment will present based on the total score scale and a related gif will show
9. All the user interaction/comment data is stored in Firebase
10. It is hosted on github https://samsamking.github.io/ga-js1-spa/

### What approach has been taken?

1. I did multiple searches. I started with fetching data from other servers, and structuring the DOM in JS
2. Get data from user input, and store the data into Firebase
3. Fetch the user input data needed, it was a matter of how to store the data, how to fit it into the DOM
4. Writing down pseudocode is helpful, there were unexpected things during the process, then more planning was needed
5. Testing small pieces of functionality frequently as suggested by Jess
6. "Google is your friend" when my code was not working
7. I got stuck, I got fustrated, but just kept trying and trying. The wall will collapse if you just keep knocking on it
8. It is a great feeling to see it is all working in the end

### What would I like to do next with your app?

1. Take Instagram out of my app, using a databse to store the images eg Firebase, so I have more control over the data
2. Render the animal images based on the total rating scores, the score data is in the Firebase already
3. Users have to login to comment, so we will have their data too


### Instructions from Jess below, thanks;)
------------------------------------------------------------

# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Unit Project #3: Single Page App

For the final project, you'll be designing and building a web app of your
choice. This project will test your knowledge of JavaScript and ask you to apply
everything you've learned in this course. The result will be a web app that you
can add to your portfolio. You could create anything from: a blog users can
comment on; an app that allows users to search for social media posts; or even
an application that logs users geolocations. Work with your instructor to create
project goals that are realistic given the scope and timing of the class.

## Overview

### SPA Architecture

Single Page Applications (SPA) are all the rage today. The single page aspect of
a SPA refers to a single page coming from the server, such as our `index.html`
page.  Once loaded, the SPA changes views by using _client-side_ routing, which
loads partial HTML snippets called templates. The goal for you implementing a
SPA is to not make users have to refresh the entire DOM every time they need a
new piece of data to be represented in the UI.

![SPA Architecture](https://cloud.githubusercontent.com/assets/25366/8970635/896c4cce-35ff-11e5-96b2-ef7e62784764.png)

### Potential Project Ideas

**Idea 1**

Movie forum site where users can post their favorite movies and rate them.

**Idea 2**

Celebrity follower app that allows users to easily pull all social media data
from their favorite celebrities.

**Idea 3**

Friend locator site that allows users to see how far away they are from their
friends.

### Suggested Ways to Get Started

- Think of a problem in the world, or even in your personal life, and apply what
  you've learned to build an application that can help solve the issue.
- Research different social media APIs (eg; twitter) and see what kind of
  information you can use from them.
- Look at different online [video games](http://phaser.io/examples) for
  inspiration.

---

## Technical Requirements

### Your core application rules:

Use JavaScript to correctly structure the code for a web application:

- Structure your application to be a SPA (single page application)
- Make HTTP requests to your own Firebase URL
- Make at least one HTTP request to a third-party server
- CRUD functionality should be present
- Perform DOM manipulation via JS (either directly, or with view templates)
- Listen for events and add interactivity based on user input

**Hosting**

App must be hosted on a third party server. Examples include `now`, GitHub
Pages, Firebase, and Heroku.

### Best Practices

Your instructor will provide feedback on how well you execute best practices.
Even though it is not part of the requirements, you should keep these in mind:

- __Clean And Readable Code__. The instructor should be able to read and follow
  your code easily. Maintain clean and readable code including: consistent
  indentation, code commenting and use of proper and consistent naming
  conventions.

- __Object Oriented and/or Functional__. Implement function closures, keep code
  modular, maintain a separation of concerns, only put code on the global scope
  when absolutely necessary, favour composition over inheritance (or use
  prototypal inheritance when you feel appropriate).

---

## Getting Started

Begin by "forking" this starter code repository. You can do so by clicking the
"Fork" icon on the top right of [this
page](https://github.com/jesstelford/ga-js1-spa). Once complete, clone the
repository to your computer by running the following commands:

```
git clone https://github.com/<your-username-here>/ga-js1-spa.git
cd ga-js1-spa
```

The `ga-js1-spa` directory now contains a copy of this repository.

As you accomplish a feature, be sure to commit it to Git and push to GitHub.

---

## Necessary Deliverables

* A **production ready web application**, SPA, hosted live on the web.
* A **new git repository hosted on Github** where codebase is maintained.
* A 3-5 minute **presentation** including at least 3 technical hurdles, 2 new
  things you learned, and what you'd like to do next with your app.

### Due Date

Presentations will be held Wednesday July 27th in class.

Your project must be submitted before class starts on Wednesday 27th July (class
starts at 6pm).

---

## Project Feedback + Evaluation

Students will fork the "ga-js1-spa" application and commit their code as they
complete pieces of functionality.

The instructional team will grade each technical requirement and provide a
numeric grade on a scale.

- **Technical Requirements**: Did you deliver a project that met all the
  technical requirements? Given what the class has covered so far, did you build
  something that was reasonably complex?
- **Creativity**: Did you add a personal spin or creative element into your
  project submission? Did you deliver something of value to the end user (not
  just a hello world response)?
- **Code Quality**: Did you follow code style guidance and best practices
  covered in class, such modularity and semantic naming? Did you comment your
  code as your instructors have in class?
- **Total**: Your instructors will give you a total score on your project.

Each category is scored according to the below, where a `1` is a _pass_.

Score | Expectations
----- | ------------
**0** | _Does not meet expectations._
**1** | _Meets expectactions, good job!_
**2** | _Exceeds expectations, you wonderful creature, you!_

The total will serve as a helpful overall gauge of whether you met the project
goals, but __the more important scores are the individual ones__ above, which
can help you identify where to focus your efforts for the next project!
