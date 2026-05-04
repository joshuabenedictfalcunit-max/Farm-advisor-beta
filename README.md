# Farm Demand Advisor Prototype

A simple static website prototype to help farmers choose what to farm based on mock market demand data.

## Files

- `index.html` — main prototype page
- `styles.css` — page styles
- `script.js` — mock data and interactive filtering/recommendation logic

## How to use

1. Open `C:\Users\acer\farmer-market-prototype` in VS Code.
2. Open `index.html`.
3. Install and use the Live Server extension, or run a local static server from the project folder.

### Run locally using Python

- Open a terminal in `C:\Users\acer\farmer-market-prototype`
- Run:
  ```powershell
  python -m http.server 8000
  ```
- Open `http://localhost:8000` in your browser.

### Run locally using Node.js

- In the project folder, run:
  ```powershell
  npx http-server
  ```
- Open the URL shown in the terminal.

### Notes

- The app now loads data from `data/demand.json`.
- If you open `index.html` directly from the file system, the browser may block the JSON request.
- Use a local server so the data file can load correctly.

### Deploying live

- Push the folder to GitHub and enable GitHub Pages.
- Or deploy the folder to Netlify / Vercel as a static site.
- The hosted site will serve `index.html`, `styles.css`, `script.js`, and `data/demand.json`.
