<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/294c7a6f-4a05-4994-8cdc-a9ad43dc6c5b

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

### Project Configuration & CI/CD Setup

As per the requirements, the following steps have been carried out to set up this project:

1. **Configured `package.json`**:
   - Installed missing type definitions for React: `@types/react` and `@types/react-dom`.
   - Re-ran `npm install` and verified build and execution locally.

2. **Designed GitHub Action Deploy Workflow**:
   - Created `.github/workflows/deploy.yml` which automates deploying the Vite application to GitHub Pages whenever code is pushed to the `main` branch.

3. **Standardized `.gitignore`**:
   - Filtered out unneeded outputs like `node_modules/`, `dist/`, logs, tool cache, and sensitive `.env*` files to maintain repository cleanliness and security.

4. **Logged Operations into `README.md`**:
   - Documented setup tasks for transparency.
