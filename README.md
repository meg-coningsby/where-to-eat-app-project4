# 🍲 Where To Eat App 🥪

This is Project 4 for my General Assembly Course - Software Engineering Immsersive.

**Table of Contents:**

-   [App Overview](#item-one)
-   [Technologies Used in App](#item-two)
-   [Installation Instructions](#item-three)
-   [App Screenshots](#item-four)
-   [General Approach](#item-five)
-   [User Stories](#item-six)
-   [Wireframes](#item-seven)
-   [Major Hurdles](#item-eight)
-   [Planned Improvements](#item-nine)

<a id="item-one"></a>

## 📖 App Overview

A fun app that allows you to search, save and keep track of restaurants or general eateries. You can also create events to encourage other users to come out and try new restaurants with you!

The core features of the app:

-   Search, using a Google Places API, for a place to eat. You can search by postcode/suburb, add requirements such as cuisine type or minimum google rating.
-   Create and manage 'lists', where you can add restaurants for future reference (e.g. Cafes to try)
-   Add visits to your saved restaurants, and include comments or a rating to remember your experience
-   Create and manage events where you can invite other users to one of your saved restaurants, to get out there and start trying your saved eateries
-   Get notified when someone invites you to an event, or if an invitee accepts or declines one of your events

_Please note: this app doesn't have a 'friends' functionality as yet, so all users are available to be invited to an event. This is next on my list of things to implement. Also, due to the cost of accessing a restaurant's full details from the Places API, the current code only pulls limited data for a restaurant details page. This can be easily expanded, but for this project's purposes, I have kept these limited to stay within my Google API credits._

<a id="item-two"></a>

## 💻 Technologies Used in App

This app is a typical MERN stack app, with some additional technologies used for styling and my Google APIs:

-   JavaScript
-   HTML
-   CSS
-   MongoDB / Mongoose
-   Express
-   Node
-   React
-   Material UI for styling
-   [ubilabs google-maps-react-hooks](https://github.com/ubilabs/google-maps-react-hooks)

<a id="item-three"></a>

## ⬇️ Installation Instructions

Install dependencies. This will automatically install all dependencies for client and server.

```
npm install
```

Run the client and server concurrently in dev mode:

```
npm run dev
```

Build the client

```
npm run build
```

Start the production server

```
npm start
```

You will also need to set up your environment variables.
Copy `.env.example` to `.env` and update as needed. Please note, there is a .env.example at the root folder level, as well as one within the client folder. You will need both. You will also need a Google API key.

<a id="item-four"></a>

## 📸 App Screenshots

To come.

<a id="item-five"></a>

## 🧭 General Approach

The requirements for this project were fairly broad, so we could look to build any complete product that persisted data in some way, had some CRUD functionality and had an interactive React front-end.

Coming up with an idea is always the hardest part, so I thought about things that I would find personally useful.

I have kept a spreadsheet of local restaurants near me for years now. It was a hard slog to populate initially - I had a Google Maps open in one window and my spreadsheet in another - copying the details for every restaurant I could find in a 1-2km radius of my house. And then I would update this spreadsheet when I visited a restaurant, with the aim to visit as many as I could. Often the spreadsheet was immediately out-of-date, with so many things opening or closing around me.

So, I wanted to see if I could make an easier version in app form! So my 'Where to Eat' app was created.

We had built a few CRUD type projects during our course, so I took a familar approach (with some detours along the way):

-   Brainstorming the idea, what functionality I'd like to build, and what technologies I could use to facilitate that
-   Building out the ERD for the database models
-   Drafting wireframes and thinking through what pages I'd want
-   Building out the base of app - I leveraged previously created MERN infrastructure apps we'd coded before
-   Ensuring the user authentication worked
-   Adding the Restaurant search and Restaurant details functionality - this was a new learning with using the Google Places API
-   Building out the other database models and CRUD functionality
-   Adding styling, using Material UI components
-   Adding in a notifications functionality
-   Adding the HTTP polling functionality for more real-time like updates for notifications
-   Final styling, clean-up and small improvements before project presentations

<a id="item-six"></a>

## 🙋 User Stories

I worked through a range of User Stories - please see the full details on my [Trello Board](https://trello.com/b/IAwKNamT/where-to-eat-project-4)

<a id="item-seven"></a>

## 🔳 Wireframes

To come.

<a id="item-eight"></a>

## ⁉️ Major Hurdles

To come.

<a id="item-nine"></a>

## ⏭️ Planned Improvements

Planned future enhancements for the app:

-   Improve error notifications in the UI (not just console notifications of errors)
-   Work on Google Places API & hook to allow more than 20 results
-   Add functionality for user's to add friends (and these requests can be accepted / declined). This then opens up a lot more functionality to add (friends collaborating on lists, being able to view each other's lists - instead of 'public lists', inviting friend's to events etc. )
-   Ability to see the restaurant search results and your list restaurants in map view (not just list view)
