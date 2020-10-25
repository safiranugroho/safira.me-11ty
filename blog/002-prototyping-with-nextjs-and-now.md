---
title: Prototyping with Next.js and Now
description: I was involved in a user research project, with eight days allocated to it. Essentially, my job was to build a high-fidelity, interactive, mobile-first prototype.
date: 2020-10-17
tags:
  - posts
layout: post.njk
---
I was involved in a user research project, with eight days allocated to it. I was the only developer, and I was working with a business analyst, an experience designer, and a product manager. Essentially, my job was to build a high-fidelity, interactive, mobile-first prototype.

> **Author's note**: This was originally posted [in Medium on Feb 1, 2019](https://medium.com/@safiranugroho/i-prototyped-using-next-js-and-now-3fcb92b87dd0). A lot has changed in the ZEIT/Vercel world! Views expressed here are based on the tools' capability and my knowledge at that time.

Before the project started, the team prepared a rough agenda for the week and agreed that the content of the prototype will come out of the research that we were doing in the first three days.

In a nutshell, I had about three full days to prepare for my role without knowing what exactly do I need to prototype except for the fact that it was a web application, and when I do, I had to be able to build it in one or two days.

(To be fair, the prototype was not an integral part of the research process, but it was important to make sure it supports the research process well.)
I then knew that I had to strategize on how to do this so that I didn’t have to waste time on setup when the project actually starts, and that mainly involved choosing the right set of tools.

<img alt="Paper wireframes" src="/img/002/paper-wireframes.jpg" srcSet="/img/002/paper-wireframes@1x.jpg 320w, /img/002/paper-wireframes@2x.jpg 480w, /img/002/paper-wireframes@3x.jpg 768w, /img/002/paper-wireframes@4x.jpg 1024w, /img/002/paper-wireframes.jpg 1920w" />

###### _Photo by [Halacious on Unsplash](https://unsplash.com/photos/tZc3vjPCk-Q)_

## What I needed from my tool(s)

- The tool needs to be highly flexible and customisable to accommodate any sudden, specific changes
- It needs to allow me to simulate mobile-first (preferably responsive) web application
- The prototype needs to be easily distributable and accessible by the stakeholders
- We agreed that all files will be static and all information will be manually put in, but some degree of interactivity is desired (i.e. input fields, clickable buttons, site navigation)
- Setup and configuration needs to be simple enough that a) it doesn’t break my heart if the project unexpectedly goes in a completely different direction and b) the probability of something going wrong during development or at runtime is small

## What I didn’t really care about my tool(s)

- There was actually no brief that says the solution needs to be coded, so I kept my mind open to other non-coding prototyping tools
- Even if I had to code it, programming best practices would probably be (kind of) thrown out the window; there will be no handover of codebase at the end of the project
- Visual design and aesthetic weren’t at the top of the priority list, although consistent styling was desirable

## What I ended up using and why

I ended up choosing to code anyway, because at the end of the day I still feel like I was able to change things faster in code rather than in Balsamiq, Sketch, Photoshop or any other GUI-based tools.

I kind of knew that I didn’t want to code in HTML and CSS from the ground up, because I knew the amount of customization involved would be too high and the time that I would need to invest in order to get to where I wanted to go would be too long.

Plus, coding it from scratch would leave me with a large margin of error and I didn’t want to spend my time tinkering CSS code.
Hence, these are what I came up with:

### Next.js

A colleague recommended Next.js to me, and after I spiked it, I fell in love with its simplicity and straightforwardness.

Next.js is a React framework that is essentially built on top of Create React App. It’s optimised for smaller build size, has file-system based routing (e.g. about.js automatically mapped to ‘{url}/about’), and dynamic styles and themes support. It has zero setup. Webpack-based dev environment, hot code reloading, server-side rendering, and production-ready builds all come by default.

With a little fear of overshooting, I chose to go with this framework; I have been working with React quite a lot recently anyway.

All I needed to do next is to find a stress-free component library that I can use without worrying about the styling, but I will cover that a little bit later.

### Now

The same colleague pointed out to me about Now, which is a global serverless deployment service. It supports building applications of various languages and frameworks, and one of them is Next.js, which deserves a brownie point for me because it would make my prototype even easier to deploy.

What Now does is it builds the Next.js application into static assets and a series of lambdas, deploys and hosts them in their cloud platform, and returns a URL for that specific deployment back. It was even easy to set up an alias and have it always be reassigned to the latest deployment.

Again, it has zero setup; you only need one config file to define what you want Now to build and deploy.

### Rebass

As I said, I was looking at different component libraries that will allow me to effortlessly reuse them without too much configuration, while also allowing me to customise them if I want to.

I ended up with Rebass, because it’s built on top of styled-system, which supports responsive and theme-based styling, and any extra customisations can directly be passed into the component via props.

I was confident in choosing this library, because I thought Rebass has an extensive list of basic components, including a Carousel, a Hide component (which will hide its children components when rendered on a screen with a resolution that you pass into the props) and various form input fields.

<img alt="Neon smiley face" src="/img/002/neon-smiley-face.jpg" srcSet="/img/002/neon-smiley-face@1x.jpg 320w, /img/002/neon-smiley-face@2x.jpg 480w, /img/002/neon-smiley-face@3x.jpg 768w, /img/002/neon-smiley-face@4x.jpg 1024w, /img/002/neon-smiley-face.jpg 1920w" />

###### _Photo by [Jason Leung on Unsplash](https://unsplash.com/photos/60j0UB-Z_Yk)_

## What worked well

For one, the page-based client-side routing that Next.js offers allowed all team members to collaborate on building the prototype. My team members built all of the static pages in Balsamiq, exported them into .jpg files, and all I had to do was render it inside a container in the app. Meanwhile, I built pages that required more complex interactions (e.g. one that had forms, the navigation).

Plus, the quick and easy deployment using Now allowed me to make rapid changes to the app and immediately provide a distributable, simple URL for the client to access it.

## Why it’s not perfect

I personally thought that it was quite an easy set of tools to use, however I do realise that React has a learning curve for people who haven’t been exposed to it as much.

It’s also probably important to note that Now mainly handles static and stateless workloads, so I don’t recommend using this deployment tool for your dynamic applications, but I still think that it’s very handy for use cases such as prototyping.

## Okay, but where’s the code?

Legal matters prevent me from sharing the actual prototype, but [here is a shell that I built before I went into the project](https://github.com/safiranugroho/app-shell). Feel free to check it out! Hopefully the code gives a better picture of what the implementation looks like. You can also [check out the deployed shell here](https://app-shell.now.sh/).
