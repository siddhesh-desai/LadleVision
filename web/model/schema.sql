CREATE DATABASE ladle_vision;
USE ladle_vision;

CREATE TABLE ladle (
  id INT PRIMARY KEY AUTO_INCREMENT,
  stillGrade VARCHAR(255) NOT NULL,
  makeYear INT,
  expiry TIMESTAMP NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ladle (stillGrade, makeYear, expiry, created)
VALUES ('Grade XYZ', 2020, '2023-12-31 23:59:59', '2023-12-15 10:45:00');


CREATE TABLE frame (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ladleno INT,
    temp FLOAT,
    loc INT,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO frame (ladleno, temp, loc)
VALUES (1, 25.5, 100);

CREATE TABLE user (
    email VARCHAR(255) PRIMARY KEY NOT NULL,
    password VARCHAR(255) NOT NULL,
    type INT DEFAULT 1,
    name VARCHAR(255) NOT NULL
);
-- Inserting a user with a specified type 0, means admin
INSERT INTO user (email, password, type, name) VALUES ('admin@gmail.com', 'admin', 0, 'Jane Smith');

-- Inserting a user with default type (1), non-admin
INSERT INTO user (email, password, name) VALUES ('user1@gmail.com', 'password123', 'John Doe');

