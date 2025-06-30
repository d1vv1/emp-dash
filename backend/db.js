import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { DatabaseSync } from 'node:sqlite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, '../database/DATA');

const db = new DatabaseSync(dbPath);


// db.exec(`
//     Create TABLE IF NOT EXISTS users (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         username TEXT UNIQUE,
//         password TEXT
//     )
// `)

export default db;