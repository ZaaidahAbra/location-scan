CREATE DATABASE tracker_db;
USE tracker_db;
DROP TABLE IF EXISTS employee_locations;

CREATE TABLE employee_locations (
  location_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,  
  employee_id INT UNSIGNED NOT NULL,                             
  latitude DECIMAL(12,8) NOT NULL,
  longitude DECIMAL(12,8) NOT NULL,
  date DATE DEFAULT (CURRENT_DATE),
  time TIME DEFAULT (CURRENT_TIME),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO employee_locations (employee_id, latitude, longitude)
VALUES (1, -33.9249, 18.4241);
