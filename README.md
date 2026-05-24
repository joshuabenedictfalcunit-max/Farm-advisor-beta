# Farm Demand Advisor Prototype

A simple static website to help farmers choose what to farm based on market demand data.

## Files

- `index.html` — main page
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

This repository is ready for GitHub Pages deployment.

To publish it:

1. Create a GitHub repository for this project.
2. Add the GitHub remote to your local repo:
   ```powershell
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git branch -M main
   git push -u origin main
   ```
3. Enable GitHub Pages in the repo settings using the `gh-pages` branch.

The repository already includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that publishes the site automatically on every push to `main`.

Alternatively, you can deploy the folder to Netlify or Vercel as a static site.

The hosted site will serve `index.html`, `styles.css`, `script.js`, and `data/demand.json`.
