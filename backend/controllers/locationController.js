const { insertLocation } = require("../models/locationModel");

exports.addLocation = (req, res) => {
  const { employee_id, latitude, longitude } = req.body;

  if (!employee_id || !latitude || !longitude) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  insertLocation(employee_id, latitude, longitude, (err, result) => {
    if (err) {
      console.error("DB Insert Error:", err);
      return res.status(500).json({ error: "Database insert failed" });
    }

    res.json({
      message: "✅ Location saved successfully",
      insert_id: result.insertId,
    });
  });
};
