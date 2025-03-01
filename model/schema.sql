CREATE DATABASE ladle_vision;
USE ladle_vision;

CREATE TABLE frame (
    FrameId INT PRIMARY KEY AUTO_INCREMENT,
    LadleNo INT,
    Location INT,
    Temperature FLOAT,
    TimeDetected TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO frame (LadleNo, Temperature, Location)
VALUES (1, 25.5, 100);

CREATE TABLE ladle (
  LadleNo INT PRIMARY KEY NOT NULL,
  SteelGrade VARCHAR(255) NOT NULL,
  ManufYear INT,
  LastCheckDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  LastUpdated TIMESTAMP,
  Location INT,
  FirstLocationTime TIMESTAMP,
  LastLocationTime TIMESTAMP,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO ladle (LadleNo, SteelGrade, ManufYear)
VALUES (2, 'Grade XYZ', 2020);

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

CREATE TABLE maintenance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  LadleNo INT,
  WorkerEmail VARCHAR(255) NOT NULL,
  CheckDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Inserting a record with LadleNo and WorkerEmail, letting CheckDate to be the default value (current timestamp)
INSERT INTO maintenance (LadleNo, WorkerEmail) VALUES (103, 'user1@gmail.com');

