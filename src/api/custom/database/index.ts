import mysql2 from 'mysql2';

import { configService, QrCode, REMOTE_MYSQL } from "../../../config/env.config";
import { waMonitor } from '../../server.module';
import { Events } from "../../types/wa.types";
import { DisconnectReason } from "baileys";

const dbConfig = configService.get<REMOTE_MYSQL>('REMOTE_MYSQL');
export const db = mysql2.createPool({
  host: dbConfig.DB_HOST,
  user: dbConfig.DB_USERNAME,
  database: dbConfig.DB_DATABASE,
  password: dbConfig.DB_PASSWORD,
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const setInstanceStatus = (instanceName: string, status: string) => {
  try {
    const WAInstance = waMonitor.waInstances[instanceName];

    let state = 'disconnected';
    let phone = null;
    if (status === 'open') {
      const wuid = WAInstance.client.user.id.replace(/:\d+/, '');
      const formattedWuid = wuid.split('@')[0];
      state = 'connected';
      phone = '+' + formattedWuid;
    }
    const disconnectedCount = Number(WAInstance.cache.get(`disconnected_count_${instanceName}`));

    if (!WAInstance.cache.has(`disconnected_count_${instanceName}`)) {
      WAInstance.cache.set(`disconnected_count_${instanceName}`, 1);
    }

    WAInstance.cache.set(`disconnected_count_${instanceName}`, disconnectedCount + 1);

    if (disconnectedCount > 2) {
      console.log('disconnect limit reached');
      WAInstance.client.ws.closeClient();
    }

    console.log('instance-status:', `${instanceName} - ${state} = ${phone} `);
    db.query(`UPDATE whatsapp_sessions SET status = '${state}' WHERE session_name = '${instanceName}'`);
    if (phone) {
      db.query(`UPDATE whatsapp_sessions SET phone = '${phone}' WHERE session_name = '${instanceName}' `);
    }
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
