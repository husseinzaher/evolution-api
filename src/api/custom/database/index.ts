import { DisconnectReason } from 'baileys';
import mysql2 from 'mysql2';

import { configService, REMOTE_MYSQL } from '../../../config/env.config';
import { waMonitor } from '../../server.module';

// import NodeCache from 'node-cache';
// const myCache = new NodeCache();

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

export const setInstanceStatus = async (instanceName: string, status: string, statusReason: number) => {
  try {
    const WAInstance = waMonitor.waInstances[instanceName];
    let state = 'disconnected';
    let phone = null;
    let profilePictureUrl = '';

    if (status === 'open' && statusReason === 200) {
      const wuid = WAInstance.client.user.id.replace(/:\d+/, '');
      const formattedWuid = wuid.split('@')[0];

      profilePictureUrl = (await WAInstance.profilePicture(wuid)).profilePictureUrl;

      state = 'connected';
      phone = '+' + formattedWuid;
    }

    console.log('instance-status:', `${instanceName} - ${state} = ${phone} `);

    if (statusReason === DisconnectReason.loggedOut || statusReason === 200) {
      const updatePhoneQuery = 'UPDATE whatsapp_sessions SET status = ? WHERE session_name = ?';
      db.query(updatePhoneQuery, [state, instanceName], (err, results) => {
        if (err) {
          console.error('Error updating status data:', err);
          return;
        }
        console.log('Data updating status successfully:', results);
      });

      if (phone) {
        const instance = {
          whatsappInstance: {
            instanceName: instanceName,
            profileName: (await WAInstance.getProfileName()) || 'not loaded',
            profilePictureUrl: profilePictureUrl,
            status: WAInstance.connectionStatus.state,
          },
        };

        const updatePhoneQuery = 'UPDATE whatsapp_sessions SET phone = ? WHERE session_name = ?';
        db.query(updatePhoneQuery, [phone, instanceName], (err, results) => {
          if (err) {
            console.error('Error updating phone data:', err);
            return;
          }
          console.log('Data updating phone successfully:', results);
        });

        // Update JSON data in the database for a specific id
        const query = 'UPDATE whatsapp_sessions SET data = ? WHERE session_name = ?';
        db.query(query, [JSON.stringify(instance), instanceName], (err, results) => {
          if (err) {
            console.error('Error updating data:', err);
            return;
          }
          console.log('Data updated successfully:', results);
        });
      }
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
