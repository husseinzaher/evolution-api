import mysql2 from 'mysql2';

export const db = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const setInstanceStatus = (device, status) => {
  try {
    let state = 'disconnected';
    if (status === 'open') {
      state = 'connected';
    }
    db.query(`UPDATE whatsapp_sessions SET status = '${state}' WHERE body = ${device} `);
    return true;
  } catch (error) {
    return false;
  }
};

export function dbQuery(query) {
  return new Promise((data) => {
    db.query(query, (err, res) => {
      if (err) throw err;
      try {
        data(res);
      } catch (error) {
        data({});
        //throw error;
      }
    });
  });
}
