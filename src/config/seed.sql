CREATE TABLE IF NOT EXISTS incident_reports (
  id SERIAL PRIMARY KEY,
  client_id INT,
  incident_desc TEXT,
  city VARCHAR,
  country VARCHAR,
  date DATE NOT NULL,
  weather_report JSON
);