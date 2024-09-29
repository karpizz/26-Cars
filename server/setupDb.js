import mysql from 'mysql2/promise';
import { hash } from './lib/hash.js';

const DATABASE_RESET = false;

async function setupDb() {
    let connection = await mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'cars',
    });
    if (DATABASE_RESET) {
        await connection.execute(`DROP DATABASE IF EXISTS cars`);
    }
    await connection.execute(`CREATE DATABASE IF NOT EXISTS cars`);

    connection.query(`USE cars`);


    if (DATABASE_RESET) {
        await rolesTable(connection);
        await usersTable(connection);
        await usersInfoTable(connection);
        await fundsTable(connection);
        await tokensTable(connection);

        await createCarType(connection);
        await createCarList(connection);

        await createRoles(connection);
        await createUsers(connection);
        await generateCarTypes(connection);
    }

    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS users (
                        id int(100) NOT NULL AUTO_INCREMENT,
                        username varchar(100) NOT NULL,
                        email varchar(100) NOT NULL,
                        password varchar(128) NOT NULL,
                        role_id int(10) NOT NULL DEFAULT 2,
                        is_blocked int(1) NOT NULL DEFAULT 0,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY role_id (role_id),
                        CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function usersInfoTable(db) {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS users_info (
                        id int(100) NOT NULL AUTO_INCREMENT,
                        users_info_id int(10) NOT NULL,
                        surname varchar(100) NOT NULL,
                        mobile int(3) NOT NULL,
                        address varchar(100) NOT NULL,
                        user_photo varchar(100) NOT NULL,
                        PRIMARY KEY (id),
                        KEY users_info_id (users_info_id),
                        CONSTRAINT users_info_ibfk_1 FOREIGN KEY (users_info_id) REFERENCES users (id)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function tokensTable(db) {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        token varchar(36) NOT NULL,
                        user_id int(10) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function rolesTable(db) {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS roles (
                    id int(10) NOT NULL AUTO_INCREMENT,
                     role varchar(10) NOT NULL,
                    PRIMARY KEY (id)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function fundsTable(db) {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS users_funds (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        users_id int(10) NOT NULL,
                        funds int(5) NOT NULL,
                        PRIMARY KEY (id),
                        KEY funds (funds),
                        KEY users_funds_ibfk_1 (users_id),
                        CONSTRAINT users_funds_ibfk_1 FOREIGN KEY (users_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createRoles(db) {
    try {
        const sql = `INSERT INTO roles (id, role) VALUES (NULL, 'admin'), (NULL, 'seller'), (NULL, 'buyer');`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createUsers(db) {
    try {
        const sql = `INSERT INTO users (id, username, email, password, role_id) VALUES (NULL, 'Jonas', 'jonas@jonas', '${hash('jonas@jonas')}', '1'),
                            (NULL, 'Kelly', 'kelly@kelly', '${hash('kelly@kelly')}', '2'),
                            (NULL, 'Tomy', 'tomy@tomy', '${hash('tomy@tomy')}', '3');`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createCarType(db) {
    try {
        const sql = `CREATE TABLE \`car-type\` (
                    id int(10) NOT NULL AUTO_INCREMENT,
                    type varchar(20) NOT NULL,
                    PRIMARY KEY (id)
                    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function generateCarTypes(db) {
    const carTypes = ['SUV', 'Sedan', 'Hatchback', 'Wagon'];
    try {
        const sql = `INSERT INTO \`car-type\` (type) VALUES ${carTypes.map(s => `('${s}')`).join(', ')};`;
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createCarList(db) {
    try {
        const sql = `CREATE TABLE IF NOT EXISTS \`create-car\` (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        name varchar(20) NOT NULL,
                        year int(4) unsigned NOT NULL,
                        price int(7) unsigned NOT NULL DEFAULT 0,
                        selectedType varchar(20) NOT NULL,
                        image varchar(100) NOT NULL,
                        status varchar(10) NOT NULL DEFAULT 'active',
                        created timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci`
        await db.execute(sql);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const connection = await setupDb();