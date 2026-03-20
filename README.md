<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# React Website

This contains everything you need to run your app locally and deploy it online.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` (if necessary) in `.env.local` to your Gemini API key, using `.env.example` as a template.
3. Start the project:
   `npm run dev`

## Deployment

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. When you push to the `main` or `master` branch, the workflow will automatically build your static site and deploy it to GitHub Pages. Make sure to enable GitHub Pages in your repository settings (Settings -> Pages -> Source: GitHub Actions).
