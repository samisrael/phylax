-- PostgreSQL Schema for Phylax Disaster Monitoring System

-- Create database (run this separately)
-- CREATE DATABASE phylax_db;
-- CREATE USER phylax_user WITH PASSWORD 'phylax_password';
-- GRANT ALL PRIVILEGES ON DATABASE phylax_db TO phylax_user;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS contributions CASCADE;
DROP TABLE IF EXISTS zones CASCADE;
DROP TABLE IF EXISTS environmental_data CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'RESPONDER')),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Create zones table
CREATE TABLE zones (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    population_estimate INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'INACTIVE' CHECK (
        status IN ('INACTIVE', 'MONITORING', 'ACTIVE', 'HIGH_ALERT', 'EVACUATE')
    ),
    risk_score DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    participant_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_zones_status ON zones(status);
CREATE INDEX idx_zones_location ON zones(location);

-- Create environmental_data table
CREATE TABLE environmental_data (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    rainfall DOUBLE PRECISION NOT NULL,
    temperature DOUBLE PRECISION NOT NULL,
    humidity DOUBLE PRECISION NOT NULL,
    forecast DOUBLE PRECISION,
    weather_condition VARCHAR(255),
    cumulative_rainfall DOUBLE PRECISION,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_environmental_data_location_recorded ON environmental_data(location, recorded_at DESC);

-- Create contributions table
CREATE TABLE contributions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (
        type IN ('MONEY', 'SUPPLIES', 'TRANSPORT', 'MEDICAL', 'FOOD', 'WATER')
    ),
    amount DOUBLE PRECISION NOT NULL,
    description TEXT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    zone_id INTEGER NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_contributions_user_id ON contributions(user_id);
CREATE INDEX idx_contributions_zone_id ON contributions(zone_id);
CREATE INDEX idx_contributions_type ON contributions(type);

-- Add comments for documentation
COMMENT ON TABLE users IS 'Stores user information for the disaster monitoring system';
COMMENT ON TABLE zones IS 'Stores information about disaster emergency zones';
COMMENT ON TABLE environmental_data IS 'Stores environmental data measurements for risk assessment';
COMMENT ON TABLE contributions IS 'Stores contributions (money, supplies, etc.) from users to zones';

-- Insert sample data for testing
INSERT INTO users (name, email, password, role) VALUES (
    'Admin User',
    'admin@phylax.com',
    '$2a$10$slYQmyNdGzin7olVN3p5be07DlH.SqIPT3a4kE8gnwkHT5gdBzuna',  -- "password123" hashed with bcrypt
    'ADMIN'
);

INSERT INTO users (name, email, password, role) VALUES (
    'Test User',
    'test@phylax.com',
    '$2a$10$slYQmyNdGzin7olVN3p5be07DlH.SqIPT3a4kE8gnwkHT5gdBzuna',  -- "password123" hashed with bcrypt
    'USER'
);

INSERT INTO zones (name, location, description, population_estimate, status, risk_score) VALUES (
    'Downtown District',
    'Downtown City',
    'Main city center zone prone to flooding',
    50000,
    'MONITORING',
    35.5
);

INSERT INTO zones (name, location, description, population_estimate, status, risk_score) VALUES (
    'Riverside Area',
    'Riverside City',
    'Low-lying area near river',
    20000,
    'ACTIVE',
    65.0
);

INSERT INTO zones (name, location, description, population_estimate, status, risk_score) VALUES (
    'Hillside Village',
    'Hillside Region',
    'Elevated area, lower flood risk',
    10000,
    'INACTIVE',
    15.0
);

-- Sample environmental data
INSERT INTO environmental_data (location, rainfall, temperature, humidity, forecast, weather_condition, cumulative_rainfall) VALUES (
    'Downtown City',
    45.5,
    28.5,
    72.0,
    65.0,
    'Rainy',
    120.0
);

INSERT INTO environmental_data (location, rainfall, temperature, humidity, forecast, weather_condition, cumulative_rainfall) VALUES (
    'Riverside City',
    78.3,
    26.2,
    85.5,
    78.0,
    'Heavy Rain',
    200.0
);

-- Sample contributions
INSERT INTO contributions (type, amount, description, user_id, zone_id) VALUES (
    'MONEY',
    5000.00,
    'Financial contribution for relief',
    2,
    1
);

INSERT INTO contributions (type, amount, description, user_id, zone_id) VALUES (
    'SUPPLIES',
    500.00,
    'Food and water packages',
    2,
    1
);

INSERT INTO contributions (type, amount, description, user_id, zone_id) VALUES (
    'TRANSPORT',
    2000.00,
    'Transportation support',
    2,
    2
);

-- Grant privileges
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO phylax_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO phylax_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO phylax_user;
