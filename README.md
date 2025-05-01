# Countries Explorer

![Countries Explorer](https://graceful-crostata-3ebae5.netlify.app/)

A modern React application that allows users to explore countries around the world using data from the REST Countries API. This application features user authentication, country filtering, search functionality, and the ability to save favorite countries.

## 🌟 Features

- **User Authentication**: Secure login and registration system
- **Country Exploration**: Browse all countries with detailed information
- **Advanced Filtering**: Filter countries by region, language, and search terms
- **Favorites System**: Save and manage your favorite countries
- **Responsive Design**: Optimized for all device sizes
- **Modern UI**: Smooth animations and transitions using Framer Motion
- **Performance Optimized**: React Suspense for data fetching and code splitting

## 🛠️ Technologies Used

### Frontend

- React 19
- React Router v7
- Axios for API requests
- Framer Motion for animations
- Tailwind CSS for styling
- React Hook Form for form handling
- Zod for form validation
- React Hot Toast for notifications

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (if running the backend locally)

## 🚀 Installation

### Frontend Setup

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd React\ Frontend\ Application\ Using\ REST\ Countries\ API
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

### Backend Setup

1. Navigate to the backend directory

   ```bash
   cd Backend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the backend server
   ```bash
   npm run dev
   ```

## 🔍 Usage

### Authentication

The application requires authentication to access its features. You can:

- Register a new account
- Login with existing credentials
- Use the "Remember me" option for persistent login

### Exploring Countries

- **Home Page**: View all countries in a responsive grid layout
- **Search**: Use the search bar to find countries by name
- **Filter by Region**: Select a region from the dropdown to filter countries
- **Filter by Language**: Select a language to filter countries
- **Combined Filters**: Use multiple filters simultaneously for precise results

### Country Details

Click on any country card to view detailed information about that country:

- Official name
- Population
- Region and subregion
- Capital
- Top-level domain
- Currencies
- Languages
- Border countries (with clickable links)

### Favorites

- Add countries to favorites by clicking the heart icon
- View all favorite countries in the Favorites page
- Remove countries from favorites with a single click

## 🏗️ Project Structure

```
├── Backend/                # Backend server code
│   ├── models/            # MongoDB models
│   └── server.js          # Express server setup
├── public/                # Static assets
├── src/
│   ├── assets/            # Images and other assets
│   ├── components/        # Reusable React components
│   ├── context/           # React context providers
│   ├── pages/             # Page components
│   ├── services/          # API service functions
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── index.html             # HTML template
├── package.json           # Project dependencies
└── vite.config.js         # Vite configuration
```

## 🚢 Deployment

The application is deployed on Netlify and can be accessed at [https://graceful-crostata-3ebae5.netlify.app/](https://graceful-crostata-3ebae5.netlify.app/)

### Build for Production

```bash
npm run build
```

This will generate a `dist` directory with production-ready files that can be deployed to any static hosting service.

## 🧪 Future Enhancements

- Dark mode support
- More detailed country statistics
- Interactive world map visualization
- Country comparison feature
- Offline support with service workers

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [REST Countries API](https://restcountries.com/) for providing the country data
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for the animation library
- [React Icons](https://react-icons.github.io/react-icons/) for the icon set

