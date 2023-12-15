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
