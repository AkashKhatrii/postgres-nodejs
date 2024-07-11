import { Client } from "pg";

/* 

Connection string: postgres://username:password@host/database 
I ran postgress locally using docker and connected to it.

*/


const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'mysecretpassword'
})

// Function to create a table

async function createUsersTable() {
    await client.connect();
    const result = await client.query(`
    CREATE TABLE users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    )`)

    console.log(result)
    await client.end();
}

createUsersTable();



// Function to insert data


async function insertData() {
    try {
        await client.connect();
        const insertQuery = "INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');";
        const res = await client.query(insertQuery);
        console.log("Insertion success: ", res);
    } catch (err) {
        console.error("Error during insetion: ", err);
    } finally {
        await client.end();
    }
}

insertData();

// Function to retrieve data

async function getUser(email: string) {
    try {
        await client.connect();
        const getQuery = 'SELECT * FROM users where email = $1';
        const values = [email];
        const result = await client.query(getQuery, values);
        console.log(result);
        if (result.rows.length > 0) {
            console.log('User found: ', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No user');
            return null;
        }
    } catch (err) {
        console.error('Error during fetching user', err);
    } finally {
        await client.end();
    }
}

getUser('user3@example.com');