const db = require("../config/db");

const insertLocation = (employee_id, latitude, longitude, callback) => {
  const sql = `
    INSERT INTO employee_locations (employee_id, latitude, longitude)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [employee_id, latitude, longitude], callback);
};

module.exports = { insertLocation };
