Pokedex Lite

About the Project

Pokedex Lite is a simple web application built using React that allows users to explore Pokemon data. The app fetches data from the PokéAPI and displays it in a clean and interactive interface.

The main purpose of this project was to practice working with APIs, managing state in React, and building a responsive UI using Tailwind CSS. I also improved the user experience by adding smooth animations using Framer Motion.

Features

Search Pokemon by name
Filter Pokemon by type
Pagination to browse through the list
Add and remove favorites (saved in local storage)
View detailed Pokemon information such as stats, abilities, height, and weight
Fully responsive design for mobile, tablet, and desktop
Smooth animations using Framer Motion for cards and modal transitions

Tech Stack

React (Vite)
Tailwind CSS
Framer Motion

PokéAPI

How to Run

npm install
npm run dev

Live Demo

https://pokedex--lite.vercel.app

Challenges Faced

One of the challenges was handling multiple API calls while fetching Pokemon details. This was solved using Promise.all, which helped improve performance.

Another challenge was managing search, filter, pagination, and favorites together without breaking the UI flow.

What I Learned

Working with APIs using async and await
Managing state in React using hooks
Building reusable components
Creating responsive layouts with Tailwind CSS
Using Framer Motion for animations
Handling multiple UI states properly

Future Improvements

Add login functionality
Improve animations further
Add infinite scroll instead of pagination
Optimize API performance
Add more advanced filters