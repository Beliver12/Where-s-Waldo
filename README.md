# Where’s Waldo – Full-Stack Image Tagging Game

**Tech Stack:** React, CSS, Node.js, Express.js, Prisma ORM, PostgreSQL

## Overview
Where’s Waldo is a full-stack web game where players search for hidden characters in a detailed image. The objective is to find all characters as quickly as possible by clicking their locations. The game tracks player performance and stores high scores in a database.

## Features
- **Interactive UI** built with React and styled using custom CSS.
- Players **enter their name before starting the game** to record their score.
- Real-time **click detection and validation** against character locations.
- **Server-side timer** ensures accurate time tracking, independent of the client.
- **Leaderboard** showing top scores from the database.
- Clean API architecture using **Node.js** and **Express**.
- **PostgreSQL** database accessed through **Prisma ORM** for type-safe queries.

## Backend Logic
- Validates clicks by comparing user-submitted coordinates to correct character positions.
- Records start and end timestamps using `Date` objects on the server to calculate elapsed time.
- Stores player names and completion times in a PostgreSQL database.
- Retrieves and ranks top scores for display on the front end.

## Learning Highlights
- Managed spatial logic and click accuracy with relative coordinates.
- Built a secure, scalable full-stack app from scratch without external auth.
- Practiced RESTful API development and database schema design with Prisma.
- Implemented a **reliable server-side timer** to prevent cheating or manipulation via the browser.

## How to Run
1. Clone the repo and install dependencies in both `/client` and `/server`.
2. Set up a PostgreSQL database and run Prisma migrations.
3. Start the backend server and React front-end.
4. Play the game and try to beat the leaderboard!

---
