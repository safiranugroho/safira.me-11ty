---
title: (Remote) Pairing 101
description: Remote pairing can sound counterintuitive, but it doesn't have to be. I shared three effective techniques for pairing remotely.
image: /img/002/person-programming.jpg
type: article
date: 2020-11-02
tags:
  - posts
layout: post.njk
---

Remote working is not a new practice, but it’s also not the norm. That has changed during this pandemic. Many software delivery teams were forced to move from working together in a shared space to remote working, which has impacted how they collaborate. One of the practices we regularly use in our projects is pair programming, and we've had to pay close attention to how we adapt this practice to the fully remote workplace.

> **Author's note**: This was originally posted [in ThoughtWorks Insights on Oct 13, 2020](https://www.thoughtworks.com/insights/blog/remote-pairing-101). Social image is by [Kelly Sikkema on Unsplash](https://unsplash.com/photos/YK0HPwWDJ1I).

Even to those who are used to pairing in physical proximity, doing it remotely can sound counterintuitive and unnatural, but it doesn’t have to be. This article will go over three main effective remote pairing techniques. While it will not explain in detail what each technique entails, it will provide some scenarios for when best to practice it and what tools are best suited for it in the context of remote working.

## The ping pong technique

This technique requires the pair to practice the ‘red-green-refactor’ cycle, where one person writes a failing test, and the other person writes the implementation code to pass it. Once the test passes, there may be an opportunity to refactor the code. The roles are then switched between who writes the test and who writes the code.

### What is it good for?

Practicing test-driven development (TDD) after a high-level solution is agreed upon. This technique encourages incremental programming and provides the opportunity to share knowledge particularly around unit testing. For example, when one person is more familiar with the programming language or the domain than the other.

In fact, the ‘ping pong’ technique requires maturity in both pair programming and TDD, so this technique is a really good way to sharpen up those skills. It also gives structure and allows for shorter pair switching cycles. As a result, this technique keeps the pair focused and prevents the developer from getting distracted when it’s not their turn to write code.

### How does it work remotely?

Two developers and one shared monitor is the classic setup for pair programming, but some pairs change it up to make it more ergonomic. One way is to hook up two keyboards to the same monitor. Another way is to have two monitors in ‘mirror’ mode with two keyboards and mouses so each developer gets a better monitor positioning relative to their keyboard, mouse and chair. As long as the pair can hear each other speak clearly, they don’t even need to sit side by side. I recommend using real-time code sharing tools like Visual Studio Live Share to emulate the same setup for pairing remotely. With this setup, each developer gets to use their own development environment, such as keyboard shortcuts and editor preferences. It’s similar to real-time collaboration over Google Docs, but for coding. The only difference is that the two developers are not physically in the same room. Especially for ping pong, this tool makes it easier for the pair to switch roles per passing test case.

<img alt="Remote pairing screenshot" src="/img/002/pairing-screenshot.png" srcSet="/img/002/pairing-screenshot@1x.png 320w, /img/002/pairing-screenshot@2x.png 480w, /img/002/pairing-screenshot@3x.png 768w, /img/002/pairing-screenshot@4x.png 1024w, /img/002/pairing-screenshot.png 1920w" />

## The strong-style pairing technique

This technique requires one person to be the Navigator, providing high-level instructions, and the other to be the Driver, performing the low-level implementation.

### What is it good for?

A significant amount of upskilling or context sharing is required. For example, Person A proposes an idea to solve a problem to Person B. At first, Person A acts as the Navigator, with Person B as the Driver, and then at some point they switch roles to validate the knowledge transfer and extend the solution. The pair keeps switching roles to achieve a nice blend of ideas; neither individual is just typing or just instructing.

### How does it work remotely?

It is not uncommon for Navigators to have an itch to take over the keyboard when they struggle to provide instructions, and the easiest way to avoid that temptation is for Navigators to not have access to the keyboard at all. To do that, I recommend screen sharing on your favorite video conferencing tool. While the Driver shares their screen, the only way the idea goes from the Navigator’s head to the Driver’s hands is by verbal communication. With this tool, a good time to switch roles would be when the code is ready to be committed and pushed to git. That way, the pair can keep their machines in sync and switch roles frequently. Strong-style pairing using a video conferencing tool not only encourages the Navigator to practice articulating their ideas, but it is also a good incentive to do continuous integration.

To take it a step further, bring in TDD as well while you practice this technique. The red-green-refactor cycle will naturally guide you to pick a checkpoint to commit your code, perhaps after a green build with all tests passing or after a refactor.

## The pair development technique

This is the only technique that does not require the pair to share a view; it defines pairing more loosely. Two people are responsible for the completion of a task, but they do it separately.

### What is it good for?

Doing research, planning or documentation. For example, the pair is unfamiliar with the technology they are required to work with so they split up to study the concepts before they get back together and discuss their findings.

### How does it work remotely?

Prioritise the work and if possible, set goals and milestones. Remember that this is still pairing, so define which pieces of work need to be done solo versus together. Make a plan to catch up but don’t wait until the scheduled time to bounce ideas off each other. Having a pair means having access to frequent feedback, so use it.

As a rule of thumb, use this technique to complete non-programming tasks in the story lifecycle. High-value tasks such as preliminary design work and troubleshooting should be done together, while tasks like writing documentation can be done individually. If there’s a need to divide and conquer the programming tasks as well (for example due to a time difference between the pair), keep the code review cycles short and maintain continuous integration to avoid code silos. However, this should be done selectively and cautiously; pair development does not equal two developers programming solo. Unless there’s a strong reason not to, I recommend using one of the other two pairing techniques instead of this one for programming tasks to maximise [the benefits of pairing](https://martinfowler.com/articles/on-pair-programming.html#Benefits).

## Tips for effective remote pairing

At its core, remote pairing is not that different from pairing in physical proximity. In fact, remote pairing can be used to introduce pairing to people who are not used to it at all, because it creates more boundaries between the pair and encourages them to define their roles more explicitly.

On the other hand, pairing inherently stretches our interpersonal skills as it requires us to be communicative, empathetic, and engaged. When done over video conferencing, we lose the ability to rely on non-verbal cues to express our intentions, such as pointing at a line of code, using body language to describe what we’re thinking, [leaning forward to indicate we’re about to speak](https://news.northeastern.edu/2020/05/11/zoom-fatigue-is-real-heres-why-youre-feeling-it-and-what-you-can-do-about-it/). As a result, we make extra efforts to compensate for these missing cues, and that’s when our energy gets drained the most. This leads to the point of which people refer to as [‘Zoom fatigue’](https://www.bbc.com/worklife/article/20200421-why-zoom-video-chats-are-so-exhausting).

With that in mind, here are tips to avoid that fatigue and make the most out of your next (remote) pairing session:

1. **Be organised.** Dedicate some time to pair during the day; two hours with 30-minute blocks is a good start, or use [the pomodoro technique](https://francescocirillo.com/pages/pomodoro-technique). Block the time on both your calendars.
1. **Take breaks.** Intense collaboration can be exhausting, even to those who are used to pairing. Remember to take breaks between sessions and step away from the monitor for a bit – move around, drink some water, take a walk.
1. **Always communicate.** If you feel the need to unplug or turn off your video for a moment, do it, but let your pair know. Your pair can’t see what happens off-screen, so any concerns or blockers should be communicated frequently.
1. **Use the tools as needed.** Considering other factors like network connectivity, bandwidth, and preferred code editor, the recommended tools above can be used interchangeably for any pairing techniques.
1. [**Be pragmatic.**](https://www.thoughtworks.com/radar/techniques/pragmatic-remote-pairing) There are a number of challenges that can make pairing feel counterproductive, but this is the moment when you take a step back and think about [what you want to achieve](https://martinfowler.com/articles/on-pair-programming.html#ToPairOrNotToPair) from your pairing session. Switch techniques or adjust the dedicated pairing time if necessary.

Happy pairing, and stay connected!
