"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword'
});
// async function createUsersTable() {
//     await client.connect();
//     const result = await client.query(`
//     CREATE TABLE users(
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(50) UNIQUE NOT NULL,
//         email VARCHAR(50) UNIQUE NOT NULL,
//         password VARCHAR(50) NOT NULL,
//         created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
//     )`)
//     console.log(result)
//     await client.end();
// }
// // createUsersTable();
// async function insertData() {
//     try {
//         await client.connect();
//         const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
//         const res = await client.query(insertQuery);
//         console.log("Insertion success: ", res);
//     } catch (err) {
//         console.error("Error during insetion: ", err);
//     } finally {
//         await client.end();
//     }
// }
// insertData();
function getUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const getQuery = 'SELECT * FROM users where email = $1';
            const values = [email];
            const result = yield client.query(getQuery, values);
            console.log(result);
            if (result.rows.length > 0) {
                console.log('User found: ', result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user');
                return null;
            }
        }
        catch (err) {
            console.error('Error during fetching user', err);
        }
        finally {
            yield client.end();
        }
    });
}
getUser('user3@example.com');
