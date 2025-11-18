import { db } from "../data/connection.js";

export const createSale = (req, res) => {
  const { amount, id_customer } = req.body;

  if (!amount || !id_customer) {
    return res.status(400).json({
      success: false,
      message: "amout e id_customer son requeridos",
    });
  }

  db.query(
    "SELECT * FROM customers WHERE id = $1",
    [id_customer],
    (error, results) => {
      if (error) {
        return res.status(400).json({ success: false, message: error.message }); 
      }

      if (results.rows.length === 0) {
        return res.status(400).json({
          success: false,
          message: "El cliente no existe",
        });
      }

      db.query(
        `INSERT INTO sales (amount, created_at, id_customer)
        VALUES ($1, NOW(), $2) RETURNING *`,
        [amount, id_customer],
        (error2, results2) => {
          if (error2) {
            return res
              .status(400)
              .json( { success: false, message: error2. message });
          }

          return res.status(201).json({
            success: true,
            message: "Venta registrada exitosamente",
            sale: results2.rows[0],
          });
        }
      );
    }
  );
};

export const getSales = (req, res) => {
  const query = `
    SELECT 
      s.id, 
      s.amount, 
      s.created_at, 
      c.name AS customer_name
    FROM sales s
    JOIN customers c ON s.id_customer = c.id
    ORDER BY s.id DESC
  `;

  db.query(query, (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      total: results.rows.length,
      sales: results.rows,
    });
  });
};

export const getSalesReport = async (req, res) => {
  db.query(
    `SELECT c.name, SUM(s.amount) AS total_sales
     FROM sales s
     JOIN customers c ON s.id_customer = c.id
     GROUP BY c.name
     ORDER BY total_sales DESC`,
    (error, results) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }

      const resultsFind = results.rows;
      const resultsLength = resultsFind.length ?? 0;

      return res.status(200).json({
        success: true,
        message: `sales report generated: ${resultsLength}`,
        resultsFind,
      });
    }
  );
};