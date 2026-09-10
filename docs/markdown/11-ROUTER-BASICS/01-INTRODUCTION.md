# From one hardcoded screen to a real app

Until now, `App` has only ever shown one thing: it imported `Home` directly and always rendered `<sfeir-home />`, no matter what was in the address bar.

<br/><br/>

Look at the toolbar in `apps/09-router` — it already has links to `/home`, `/locator` and `/people`. Click one today: the URL changes, but **nothing on screen reacts**. That's the problem the Router solves.

##==##

# localhost:4200/home

![](assets/images/school/navigation/navigation_home.png 'w1600 center')

##==##

# localhost:4200/people

![](assets/images/school/navigation/navigation_list.png 'w1600 center')

##==##

# localhost:4200/locator

![](assets/images/school/navigation/navigation_locator.png 'w1600 center')

Notes:

- These three screens are all part of the same single-page app — the Router is what decides which one to render for a given URL, without ever reloading the page.
