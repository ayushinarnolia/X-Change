# X-Change

X-Change is a web platform designed to facilitate seamless item exchanges between users. It allows users to list items they want to exchange, browse available listings, communicate with others, and track their transactions. The platform features a user-friendly interface with a pastel blue theme for a pleasing experience.

## Features
- **User Authentication**: Secure login and signup system.
- **Item Listings**: Users can create, browse, and manage listings.
- **Exchange System**: Facilitates item exchanges with a rating and review system.
- **Filtering & Search**: Advanced search and filtering options for better navigation.
- **Messaging & Notifications**: Integrated chat and notification system.
- **Moderation & Approval**: Listings and reviews go through an approval process.
- **Chatbot Integration**: AI-powered chatbot using Tidio for assistance.

## Tech Stack
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js / Firebase Authentication (Planned)
- **Database**: Firebase / MongoDB (Planned)
- **Hosting**: GitHub Pages (Frontend), Backend hosting (TBD)

## Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/your-username/X-Change.git
   cd X-Change
   ```

2. **Run Locally** (for frontend only)
   - Open `index.html` (or `home.html`) in a browser.

3. **Deploying to GitHub Pages**
   - Ensure `index.html` is in the root directory.
   - Go to repository settings → GitHub Pages → Select `main` branch.

## Adding Tidio Chatbot
1. Sign up on [Tidio](https://www.tidio.com/).
2. Select **Manual Install** and copy the given script.
3. Paste it before the `</body>` tag in `index.html` or all pages.
4. Commit and push the changes.
   ```sh
   git add .
   git commit -m "Added Tidio chatbot"
   git push origin main
   ```
