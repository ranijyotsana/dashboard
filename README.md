# React Mini Dashboard (CRA-style)

This project is a ready-to-use frontend mini-dashboard using React 19, Tailwind CSS, Redux Toolkit, and Recharts.
It uses the mock API `https://dummyjson.com/users` and maps that data into borrower/loan-like objects.

## Features
- Dashboard with searchable, sortable, paginated table
- Borrower detail modal with simulated live status updates
- Analytics page with Pie chart
- Dark mode toggle
- Redux Toolkit for state management (borrowers slice)
- Tailwind CSS for responsive attractive UI

## How to run locally
1. Ensure you have Node.js and npm installed.
2. Create project and replace files, or use this folder:
   ```bash
   npm install
   npm start
   ```
3. The app runs at http://localhost:3000

(You may need to run `npx tailwindcss -i ./src/index.css -o ./src/tailwind-output.css --watch` if you customize Tailwind build in some setups.)

