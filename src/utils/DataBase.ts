// import SQLite from 'react-native-sqlite-2';
import { openDatabase } from 'react-native-sqlite-storage';

import {createTables, inserts, dropTables} from '../query/createTable';
const database_name = 'test.db';
const database_version = '1.0';
const database_displayname = 'SQLite Test Database';
const database_size = 200000;

class Database {
  db: any = null;
  constructor () {
    // this.db = SQLite.openDatabase(
    this.db = openDatabase(
      database_name,
      database_version,
      database_displayname,
      database_size,
      () => { console.log('OPEN database'); },
      (error: string) => { console.log('Error database', error); },
    )
  }

  getQuery (query: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn: any) => {
        txn.executeSql(query, [], (tx, res) => {
          resolve(res.rows.raw());
        }, (e: string) => {
          console.log(e);
          reject(e);
        })
      },
      (e: string) => {
        console.log(e);
        reject(e);
      });
    });
  }

  populateDB () {
    return new Promise((resolve, reject) => {
      this.db.transaction((txn: any) => {
        [...dropTables, ...createTables, ...inserts].forEach(query => {
          txn.executeSql(query);
        })
        txn.executeSql("SELECT * FROM MedicalGroup", [], (tx, res) => {
          // console.log('-->', res.rows.raw())
          resolve(res);
        }, (e: string) => {
          console.log(e);
          reject(e);
        })
      },
      (e: string) => { console.log(e); });
    });
  }
  
  getDB() {
    return this.db;
  }
}

export default new Database();
