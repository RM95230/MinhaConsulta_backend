const db = require("../db/database");

// Obter todas as consultas
exports.getConsultations = (req, res) => {
  db.all("SELECT * FROM consultations", [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erro ao obter consultas" });
    } else {
      res.json(rows);
    }
  });
};

exports.createConsultation = (req, res) => {
  const { userId, date, doctor, specialty, status } = req.body;
  db.run(
    `INSERT INTO consultations (userId, date, doctor, specialty, status) VALUES (?, ?, ?, ?, ?)`,
    [userId, date, doctor, specialty, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};

// Atualizar consulta
exports.updateConsultation = (req, res) => {
  const { id } = req.params;
  const { doctor, date, status } = req.body;

  db.run(
    "UPDATE consultations SET doctor = ?, date = ?, status = ? WHERE id = ?",
    [doctor, date, status, id],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erro ao atualizar consulta" });
      } else {
        res.status(200).json({ message: "Consulta atualizada com sucesso" });
      }
    }
  );
};

// Deletar consulta
exports.deleteConsultation = (req, res) => {
  const { id } = req.params;

  db.run("DELETE FROM consultations WHERE id = ?", [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erro ao deletar consulta" });
    } else {
      res.status(200).json({ message: "Consulta deletada com sucesso" });
    }
  });
};
