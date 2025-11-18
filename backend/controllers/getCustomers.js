import { db } from "../data/connection.js";

export const getCustomers = async (req, res) => {  
  db.query("SELECT * FROM customers", (error, results) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    const customers = results.rows;
    return res.status(200).json({
      success: true,
      total: customers.length,
      customers,
    });
  });
};

export const searchCustomerByCode = async (req, res) => { 
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "El parametro codigo es requerido",
    });
  }

  db.query(
    "SELECT * FROM customers WHERE code = $1",
    [code],
    (error, results) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }

      const resultsFind = results.rows;
      const resultsLength = resultsFind.length ?? 0;  

      return res.status(200).json({
        success: true,
        message: `clientes encontrados: ${resultsLength}`,
        resultsFind,
      });
    }
  );
};