# Music Library Micro-Frontend App

## GitHub Repositories
- Host app (Main App): [https://github.com/Shashank100909/finacplus-main-app](https://github.com/Shashank100909/finacplus-main-app)  
- Micro-frontend (MusicLibrary): [https://github.com/Shashank100909/finacplus-music-library](https://github.com/Shashank100909/finacplus-music-library)


## Live Links
- Host app: [https://finacplus-main-app-eta.vercel.app/](https://finacplus-main-app-eta.vercel.app/)  
- MusicLibrary micro-frontend: [https://finacplus-music-library-lnqq.vercel.app/](https://finacplus-music-library-lnqq.vercel.app/)


## How to Run Locally
1. Clone the repositories:
```bash
# Main App
git clone https://github.com/Shashank100909/finacplus-main-app.git
cd finacplus-main-app
npm install

# MusicLibrary Micro-Frontend
git clone https://github.com/Shashank100909/finacplus-music-library.git
cd finacplus-music-library
npm install
Start the apps:

# Start Main App
cd finacplus-main-app
npm start  # Runs on port 8080

# Start MusicLibrary
cd finacplus-music-library
npm start  # Runs on port 8081


Open in browser:
Host app: http://localhost:8080
MusicLibrary: http://localhost:8081

## How the project was deployed
Deployed on Vercel using GitHub import.
Each micro-frontend is independent, integrated using Webpack Module Federation.
Deployment steps:
1.Push code to GitHub.
2.Import the repository in Vercel.
3.Vercel automatically builds and deploys the apps.
Host app dynamically loads the micro-frontend at runtime.

## Demo Credentials
Role	Username	Password
Admin	admin	admin@123
User	user1	user@123

## Behavior:
Admin: Can add and delete songs.
User: View-only access.

## How Micro-Frontend Works
Architecture: Host app + independent micro-frontends (e.g., MusicLibrary) via Module Federation.
Integration: Host app passes role or user info as props to micro-frontends.
Benefits: Each micro-frontend can be developed, deployed, and updated independently.

## How Role-Based Auth Works
Upon login, a mock JWT is generated:
json
Copy code
{
  "username": "admin",
  "role": "admin"
}
Stored in localStorage.
Admin: Can see Add/Delete buttons, manage songs.
User: Only view content.
Micro-frontends read the role from the host to render UI accordingly.

## Tech Stack
React, Webpack 5, Module Federation
CSS for styling and responsive design
Deployed on Vercel
Responsive layout: sidebar, album carousels, modals

## Features
Login system with role-based access
Sidebar with off-canvas behavior on mobile
Album cards with truncation and touch-friendly buttons
Horizontal scroll sections for albums
Add/Delete songs for admin