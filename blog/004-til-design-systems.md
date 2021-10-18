---
title: "TIL: Components, CSS, design systems, oh my!"
description: I recently had the pleasure of working on a mature, highly adopted design system built with React. These are some of the things I learned after that engagement, written as a note for my future self, really, more than anything else.
image: /img/004/react-code.jpg
type: article
date: 2021-10-18
tags:
  - posts
layout: post.njk
---

I recently had the pleasure of working on a mature, highly adopted design system built with React. I have had a decent amount of exposure to front-end technologies, but this project was exceptionally fun as it required me to dive even deeper into it. These are some of the things I learned after that engagement, written as a note for my future self, really, more than anything else.

## 💭 Think in APIs.

I would argue that the majority of elements in a design system component makes up, if not directly affects, that component's API. The exposed component itself, every prop accepted by that component, every value accepted by that prop, any styles applied to the component, and any exposed type definitions – they are all public APIs. The API specification is your design system's documentation, design guidelines, and example component usages combined.

Hence, any internal design decision you make that *could* change the shape/definition of any of those elements is as crucial as the *very act* of making changes to those elements directly.

## 💔 Breaking changes shouldn't break hearts.

One of the primary goals of this project was to overhaul the design system components to modernize their APIs, which involved making breaking changes where necessary.

Making breaking changes is not a decision to be taken lightly. Changing the shape of an API or deprecating said API requires its users to update their usages – otherwise their code is going to, you know, *break*. Hence, since we were overhauling the components, when we have identified *multiple* changes that we'd like to make to a component's APIs, it was very easy to suggest to bundle all of those changes in one big release as a new major version so the consumers would only need to upgrade its dependency *once* and re-write the affected usages *once*.

One strategy that we used to reduce the delay of the release was to split out the non-breaking changes from the breaking changes as much as we could. Instead of releasing *everything* as one major version upgrade at the end, we aimed to release multiple patch and minor versions and leave out as little breaking changes as we could. 

For example, one of the enum values that an existing prop accepts was redundant because its behavior was almost identical to another value in the enum. We decided that it should be removed from that prop's API altogether. To put this change out to our consumers quicker, we merged the behaviors of the two enum values under the hood without changing the prop's API, released that change as a minor version upgrade, and saved the removal of the redundant value for the major version release at the end.

Even with that though, we still ended up with one huge release at the end. For the one component that I worked on for example, there was a difference of ~3 months between the time that the last non-major version was released and the final major version being released. It saddens me a little that the very nature of releasing breaking changes goes against the ethos of continuous integration and continuous delivery – integration between changes were delayed until the end, and some code that was written then was only delivered to the consumers three months later.

Why *can't* we release major versions more frequently? 

For one thing, requiring direct users to re-write affected usages of that package is work enough, and then it gets a bit more complicated when the package is installed as a transitive dependency. In other words, say web app A directly depends on package B, which depends on package C (our component!) – then package C is a transitive dependency of web app A. For any changes included in the latest major version of package C to trickle down to web app A, package B first needs to upgrade the version and update its usage of package C, and maybe release *its own* major version upgrade *if* it forces them to make breaking changes in their own package. Only then can web app A to get the changes in package C, by upgrading the version and updating its usage of package B. 

In the ideal, perfect, unicorn-filled world, breaking changes for design system components are released the way any other changes are released: more frequently and in smaller increments, with its consumers promptly (maybe even automatically) keeping up with the latest versions and updating their usages *also* in small increments, and those efforts are baked into their KTLO work.

"Safira, it's not that simple."

I know, but a dev can dream.

## 🤓 Take time to understand CSS.

When writing CSS, it's good to *really* understand what each property does before choosing to apply them. One little decision could snowball into an unnecessary change to the component's API. For example, the decision between positioning an element with `absolute` versus `fixed`. As you probably know, `absolute` positions an element relative to its parent, while `fixed` positions it relative to the viewport. Because of this behavior, a bug was found in a component that uses the `absolute` positioning on one of its elements.

The fix, we decided, would be to change the element's position to `fixed`. However, this is considered a breaking change because a public prop controls this positioning based on the enum that it accepts. Changing this element's positioning would completely change the component's behavior when interacting with other elements.

As a workaround to avoid this breaking change, the public prop was modified to extend the enum and accept *another* value that applies the `fixed` positioning under the hood so that consumers can choose to opt-in to this new behavior.

This workaround was not a sustainable solution because it made the component and its API unnecessarily more complex. Again, there is something to be said about managing breaking changes – changing the element position should have been an easier process than it was – but that's not the point I'm making here.

The component's API just became less intuitive because of the misuse of a single CSS property. That's why when in doubt, it helps to take a step back to research, have a read, and be really intentional when writing CSS, especially in a design system where each change propagates to multiple applications.

## 🧐 Does your prop really need to accept multiple options?

Speaking of APIs, one of the primary points of interaction your consumers have with your components is their props. For this reason, each prop carries as much weight to your component architecture as anything else – as we've learned from the previous story, any changes to a behavior that is controlled by a public prop are considered breaking. Hence, the type of data that each prop accepts needs to be decided carefully.

For example, if your prop only accepts two values, then that's a good signal to convert it to a boolean prop. Instead of making the prop represent two possible behaviors as a set of two enum values, make it describe the ability to opt-in and out of the functionality. This makes the prop definition tighter, with less chance for any future unnecessary code branches to creep in.

## 📝 Leave comments *if* needed.

I haven't been the biggest fan of comments in code because they are tricky and could lead to tons of zombie codes and outdated information. However, if a decision to use certain approaches or CSS properties seems too novel to be self-explanatory, I think it's okay to leave a comment to describe *why* you made that decision. This forces you to be more deliberate about what is written and helps future maintainers understand the desired behavior you wanted to achieve when you wrote it.

Then again, comments should be used with caution only when we really need to. Be careful not to fall into the trap of describing every single piece of code. You might need to occasionally explain the *why*, but *what* you write should be self-explanatory in other ways (i.e., think variable names, separation of concern, etc).

## 💞 Pair with UX designers. Often.

Speaking of behaviors, maintain a close feedback loop with UX designers. In fact, pair with them whenever you've got a chance. When you’re stuck on a technical problem as you develop the component, step back and ask for the designer's input. I know it sounds counterintuitive, but I often find that it is actually a user experience problem in technical clothing, especially when working in the front-end realm. Pairing with designers can help you narrow down the solution.

How, exactly, do you expect the component to behave? What experience do you want to give your *end-users* (i.e., the people using products built with your components)? What do you expect your *design system consumers* (i.e., developers *building* products with your components) to do?

## 🚀 JavaScript is not the enemy.

One of the key cross-functional requirements that I needed to pay attention to was component performance. One easy way to improve a component's performance is to minimize JS implementation and rely on CSS for some of the presentational logic. You can do a lot with pure CSS without relying on JS, especially when you really take advantage of native HTML attributes!

However, if you find yourself doing many hacks to get extra logic in your CSS implementation, then it’s probably time to cut the losses – JS is not all bad. Just because some of the logic is written in JS doesn't mean that it needs to be less performant. Performance can still be maintained in other ways, like relying on animation frames to perform repetitive and expensive processes, maintaining stable references of functions and variables between each render cycle, and having stricter control over what can or cannot trigger a component to re-render.

## 👭 Accessibility and performance are best friends.

Another way to improve performance is to produce smaller JS bundles. One way to achieve *that* is to look for opportunities to flatten the DOM tree. Right out of the bat, you start to evaluate what each of the current DOM nodes is doing – is it responsible for positioning its children? Hiding its children? Carrying information? Calling for action? Naturally, you would then think about other native HTML elements or attributes that allow you to achieve the same result, only more efficiently. 

For example, instead of using a `div`, think about other block elements that semantically fit your use case better. Another example – instead of changing the node type between `a` and `span`, which results in unmounting and re-mounting the component, simply unset the `href` attribute to avoid having the screen reader announce that it's actionable.

With accessibility and performance, you can have your cake and eat it too!

## 📸 Thoughts about visual regression tests.

To clarify, by visual regression tests, I mean tests where a snapshot is captured and compared to a baseline (an existing snapshot previously committed to version control, produced by the same test) to detect visual differences if they exist. The snapshot produced is an actual image file, not a snapshot of the source code.

This one I have a bit of love and hate relationship with. I love it when the snapshots tell me what I need to look out for and provide me with guard rails against unwanted behaviors. I love it when the tests are written thoughtfully.

When I'm producing a snapshot, I like to think of these questions to ask myself: what size is the viewport set to? What native browser capabilities am I relying on? What visual elements am I paying attention to? Which part of this component's presentational logic am I providing guard rails for?

For example, if I want to note the element's positioning relative to the viewport, I would capture the whole screen but minimize the amount of non-essential elements I have on that screen to reduce the possibility of future false negatives. If I want to note the element's positioning only relative to its parent, I would take the snapshot only within the boundary of that parent element.  If I want to capture the styling of the element's focus state, then I would tighten the boundary even further.

On the flip side, I hate it when the snapshot captures too many non-essential elements that it's difficult to know if my changes caused the regression or if it's a result of poor maintenance of the test. I hate it when the test relies on asynchronous processes – hard no. I hate it when it's written to replace unit tests, specifically to cover non-presentational logic. Shivers. I hate that visual regression tests protect me *only if they exist*. If nothing were captured, I would have no view of where I need to ensure visual parity. I also hate it when the test fails, but the reported difference is *not* visually distinguishable by the human eyes. In that case, is it actually a breaking change? Maybe, maybe not. See? I hate maybes. I'd say having flaky tests is worse than having no tests at all.

Needless to say, visual regression tests come with the caveat that their margin of error is higher, and the feedback cycle is not as fast as other lower-level tests. Unfortunately, it was pretty much the only way to cover CSS implementations within the codebase that I worked with, so I still found it very valuable when working within the context of a design system. I think the trick is to be really thoughtful and intentional when writing them. 

Does presentational logic implemented in CSS need to be covered by an automated test at all? In the context of a design system, I would argue yes, because remember – everything that is exposed in a component is a public API. Have I found a better alternative to do it than visual regression tests? No. If anyone has, hmu.