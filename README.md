# CodeMart - Student Code & Project Marketplace

A full-stack ecommerce platform where students can sell and buy coding projects, code snippets, and designs.

## Project Structure

```
code mart spring boot/
├── backend/          # Spring Boot REST API
├── frontend/         # React.js Frontend
└── database/         # MySQL Database setup
```

## Features

### Student Features
- Browse and search for code projects and snippets
- Purchase code projects and designs
- Download purchased items
- View purchase history
- User authentication and profile management

### Seller Features
- List code projects and snippets for sale
- Manage product listings
- Track sales and earnings
- View order history
- Edit product details

### Common Features
- User authentication with JWT tokens
- Product filtering by category, language, and difficulty
- Search functionality
- Product ratings and reviews

## Technology Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- MySQL 8.0
- JWT for authentication

### Frontend
- React 18
- React Router v6
- Axios for API calls
- CSS for styling

### Database
- MySQL

## Prerequisites

- Java 17 or higher
- Node.js 16+ and npm
- MySQL 8.0 or higher
- Maven 3.8+

## Installation & Setup

### 1. Database Setup

**On Windows:**

```bash
# Open MySQL Command Line Client or MySQL Workbench
mysql -u root -p

# Inside mysql prompt, run:
source "C:\GMR\3-2 6th sem'\professional elective - waf\code mart spring boot\database\setup.sql"

# Or copy-paste the SQL commands from setup.sql file
```

**Default Database Credentials:**
- Database: `codemart`
- User: `root`
- Password: `root`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd "C:\GMR\3-2 6th sem'\professional elective - waf\code mart spring boot\backend"

# Build with Maven
mvn clean install

# Run the application
mvn spring-boot:run
```

Backend will start on: `http://localhost:8080`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd "C:\GMR\3-2 6th sem'\professional elective - waf\code mart spring boot\frontend"

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will open on: `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user/{id}` - Get user details
- `PUT /api/auth/user/{id}` - Update user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/seller/{sellerId}` - Get seller's products
- `GET /api/products/search?keyword=` - Search products
- `POST /api/products?sellerId=` - Create product (seller)
- `PUT /api/products/{id}?sellerId=` - Update product (seller)
- `DELETE /api/products/{id}?sellerId=` - Delete product (seller)

### Orders
- `POST /api/orders?buyerId=&productId=` - Create order (purchase)
- `GET /api/orders/{id}` - Get order details
- `GET /api/orders/buyer/{buyerId}` - Get buyer's orders
- `GET /api/orders/seller/{sellerId}` - Get seller's sales
- `PUT /api/orders/{id}/status?status=` - Update order status

## Sample User Data

After database setup, you can login with:

**Seller Account:**
- Email: `seller@codemart.com`
- Password: `password123`

**Student Account:**
- Email: `student@codemart.com`
- Password: `password123`

## Running the Complete Application

### Quick Start (Open two terminals)

**Terminal 1 - Backend:**
```bash
cd "C:\GMR\3-2 6th sem'\professional elective - waf\code mart spring boot\backend"
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
cd "C:\GMR\3-2 6th sem'\professional elective - waf\code mart spring boot\frontend"
npm start
```

## Application Features

### Home Page
- Display all available products
- Search functionality
- Product cards with ratings and download count

### Authentication
- User registration with role selection (Student/Seller)
- Login with email and password
- JWT token-based authentication

### Product Management (Seller)
- Create new product listings
- Edit existing products
- Delete products
- Track product downloads

### Shopping (Student)
- Browse products by category
- Search for specific projects
- View product details
- Purchase products
- Download purchased items

## Troubleshooting

### Backend Issues

**MySQL Connection Failed:**
- Ensure MySQL is running
- Check username and password in `application.properties`
- Verify database `codemart` exists

**Port 8080 Already in Use:**
- Change port in `application.properties`: `server.port=8081`

### Frontend Issues

**Dependencies Installation Failed:**
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

**Port 3000 Already in Use:**
- Kill the process: `npx kill-port 3000`
- Or change port: `PORT=3001 npm start`

## Project Structure Details

```
backend/
├── src/main/java/com/codemart/
│   ├── CodeMartApplication.java       # Main Spring Boot application
│   ├── controller/                    # REST API controllers
│   ├── service/                       # Business logic
│   ├── repository/                    # Database access layer
│   ├── entity/                        # JPA entities (Models)
│   ├── dto/                           # Data Transfer Objects
│   ├── security/                      # JWT and security config
│   └── config/                        # Spring configuration
└── pom.xml                            # Maven dependencies

frontend/
├── src/
│   ├── components/                    # React components
│   ├── pages/                         # Page components
│   ├── services/                      # API services
│   ├── context/                       # React context (Auth)
│   ├── styles/                        # CSS files
│   ├── App.js                         # Main App component
│   └── index.js                       # React entry point
├── public/
│   └── index.html                     # HTML template
└── package.json                       # NPM dependencies
```

## Future Enhancements

- Payment gateway integration (Stripe/PayPal)
- Product reviews and ratings system
- User profile with analytics dashboard
- Advanced search and filtering
- Real-time notifications
- File upload functionality
- Admin dashboard
- Email notifications
- Wishlist feature
- Seller ratings and reviews

## License

MIT License - Feel free to use this project for educational purposes.

## Support

For issues or questions, please check the troubleshooting section or review the setup steps carefully.
