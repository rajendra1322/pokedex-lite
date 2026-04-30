# Pokedex Lite 
## About the Project

Pokedex Lite is a simple React web app where you can explore Pokémon data. It uses the PokéAPI to fetch information and shows it in a clean and easy-to-use interface.

I built this project mainly to practice working with APIs, React state management, and responsive design using Tailwind CSS. I also added some animations using Framer Motion to make the UI feel smoother.

---


## Features

*Search Pokémon by name
*Filter Pokémon by type
*Pagination to move through the list
*Add/remove favorites (stored in local storage)
*View detailed Pokémon info like stats, abilities, height, and weight
*Fully responsive for mobile, tablet, and desktop
*Smooth animations for cards and popup modal

---


## Tech Stack

*React (Vite)
*Tailwind CSS
*Framer Motion
*PokéAPI

---


## How to Run
bash
npm install
npm run dev

---


## Live Demo

https://pokedex--lite.vercel.app


---



## Challenges I Faced

The main challenge was handling multiple API calls when loading Pokémon details. I fixed this using Promise.all() to make it faster.

Another challenge was managing search, filter, pagination, and favorites together without breaking the UI flow.

---



## What I Learned
*How to work with APIs using async/await
*How to manage state in React
*How to build reusable components
*How to make responsive layouts using Tailwind CSS
*How to add animations using Framer Motion
*How to handle multiple UI states properly

---


## Future Improvements

*Add login system
*Improve performance
*Add infinite scroll instead of pagination
*Add more filters
*Improve UI animations

---