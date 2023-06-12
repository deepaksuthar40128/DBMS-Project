import dotenv from "dotenv"
dotenv.config({ path: ".env" });
import mysql from "mysql"

export const db = mysql.createConnection({
  host: process.env.SQLHOST,
  user: process.env.SQLUSER,
  password: process.env.SQLPASS,
  database: process.env.SQLDB
}) 