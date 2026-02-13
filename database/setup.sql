-- Create Database
CREATE DATABASE IF NOT EXISTS codemart;
USE codemart;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    profile_image LONGTEXT,
    bio LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description LONGTEXT,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    language VARCHAR(100),
    difficulty VARCHAR(50),
    features LONGTEXT,
    file_url LONGTEXT,
    preview_url LONGTEXT,
    seller_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    downloads INT DEFAULT 0,
    rating DOUBLE DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (seller_id) REFERENCES users(id),
    INDEX idx_category (category),
    INDEX idx_seller_id (seller_id),
    INDEX idx_active (active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    buyer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    transaction_id VARCHAR(255),
    notes LONGTEXT,
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    INDEX idx_buyer_id (buyer_id),
    INDEX idx_product_id (product_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    reviewer_id BIGINT NOT NULL,
    rating INT NOT NULL,
    comment LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    INDEX idx_product_id (product_id),
    INDEX idx_reviewer_id (reviewer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Insert sample data
INSERT INTO users (email, password, full_name, role, active) VALUES
('seller@codemart.com', '$2a$10$slYQmyNdGzin7olVN3ou2OPST9/PgBkqquzi.Oy1g7YLyCN5U3wE6', 'John Seller', 'SELLER', TRUE),
('student@codemart.com', '$2a$10$slYQmyNdGzin7olVN3ou2OPST9/PgBkqquzi.Oy1g7YLyCN5U3wE6', 'Jane Student', 'STUDENT', TRUE);

INSERT INTO products (title, description, category, price, language, difficulty, features, seller_id, downloads, rating, active) VALUES
('React To-Do App', 'A complete React application for managing your daily tasks with local storage support', 'WEB_PROJECT', 299, 'JavaScript', 'BEGINNER', 'Add/Delete tasks, Local storage, Responsive design', 1, 25, 4.5, TRUE),
('Python Web Scraper', 'Advanced web scraping tool using BeautifulSoup and Selenium', 'CODE_SNIPPET', 199, 'Python', 'INTERMEDIATE', 'Multi-threading, Error handling, Export to CSV', 1, 15, 4.8, TRUE),
('E-Commerce API', 'Full-featured REST API built with Spring Boot for e-commerce', 'WEB_PROJECT', 599, 'Java', 'ADVANCED', 'JWT Auth, MySQL, Payment integration ready', 1, 42, 4.9, TRUE),
('UI Design Kit', 'Professional UI components and design patterns', 'DESIGN', 99, 'Design', 'BEGINNER', 'Figma file, 50+ components, Dark mode', 1, 68, 4.7, TRUE);

-- Update sequences for auto_increment
ALTER TABLE users AUTO_INCREMENT=3;
ALTER TABLE products AUTO_INCREMENT=5;
