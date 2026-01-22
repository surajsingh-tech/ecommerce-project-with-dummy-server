<!-- 

 -->

## E-Commerce Web Application (React.js, Redux-Saga, json-server)

## Overview
  A full‑featured E-Commerce Web Application built with React.js, Redux, Redux-Saga, Bootstrap, and json-server.
  It demonstrates a complete shopping flow with product listing, cart management, checkout, and includes an Admin Panel for product/category management.
  Currently uses dummy JSON server but is future-ready for REST API integration.

## Tech Stack
  - React.js + TypeScript
  - Redux & Redux-Saga for state management and side effects
  - Bootstrap for responsive design
  - json-server for dummy backend (data.json)
  - Environment Variables (.env securely ignored in Git)

## Project Structure
   MY E-COMMERCE PROJECT/
  │
  ├── 02 Mejor Project/       # React frontend (Buyer & Admin UI)
  │   └── Uses Redux-Saga, Bootstrap, and centralized .env
  │
  ├── Rich Text Editor/       # Reusable editor module (used in Admin Panel)
  │   └── Integrated into Admin product/category forms
  │
  ├── server/                 # Dummy backend using json-server (data.json)
  │   └── Serves REST-like endpoints for frontend consumption
  │
  ├── .env                    # Centralized environment variables (API base URL, role configs, etc.)
  ├── .gitignore              # Ignores node_modules, .env, build artifacts
  └── README.md               # Root documentation with setup, features, and demo credentials

## Features

  # Buyer Features
  - Product listing with filters
  - Add to Cart & Remove from Cart
  - Wishlist management
  - Place Order & Order Tracking
  - Buyer profile management (address insertion & profile editing)
  - Responsive UI for mobile & desktop

  # Admin Features
  - Create categories & subcategories
  - Manage products with price and discount
  - Full CRUD operations on products
  - Real-time updates: admin changes instantly reflect on user interface
  - Role-based access:
  - Buyers → Shopping panel to browse & purchase products
  - Admins → Dedicated panel to manage FAQs, monitor orders, and update order status

  # Authentication & Validation
  - Secure login/logout functionality for both buyers and admins
  - Password validation using 3rd‑party validator library
  - .env used for sensitive environment variables
  - Forget Password flow: User verifies their username, email, or phone number → if the information matches, they can reset/change their password

  # State Management
  - Redux-Saga used for handling asynchronous operations and side effects
  - Smooth API calls and predictable state management

##  Demo Credentials
  # Buyer Login
  - Username: Chandan
  - Email: Chandan123@gmail.com
  - Password: Chandan@1234

  # - Super Admin Login
  - Username: Suraj
  - Email: bangarisuraj@gmail.com
  - Password: Suraj@1234
 
  # - Admin Login
  - Username: Dev
  - Email: dev1234@gmail.com
  - Password: Dev@1234

## Installation & Run Instructions

  # Clone the Repository

  git clone https://github.com/surajsingh-tech/ecommerce-project-with-dummy-server.git
  
  cd  ecommerce-project-with-dummy-server

  # Backend (json-server)
  cd server
  npm install
  json-server --watch data.json --port 8000

  # Frontend
  cd "02 Mejor Project"
  npm install
  npm run dev

  # API Endpoints (Dummy Server)
  - http://localhost:8000/newsletter
  - http://localhost:8000/testimonial
  - http://localhost:8000/address
  - http://localhost:8000/cart
  - http://localhost:8000/wishlist
  - http://localhost:8000/contactus
  - http://localhost:8000/brand
  - http://localhost:8000/maincategory
  - http://localhost:8000/product
  - http://localhost:8000/subcategory
  - http://localhost:8000/faq
  - http://localhost:8000/feature
  - http://localhost:8000/setting
  - http://localhost:8000/user
  - http://localhost:8000/checkout
