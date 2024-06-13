import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

var db = SQLite.openDatabase({name: 'ecomm.db', location: 'default'});

const executeSqlQuary = async (qry: string, params: any = undefined) => {
    try {
        const dbInstance = await db;
        return await dbInstance.executeSql(qry, params);
    } catch (error) {
        console.log({ error });
        return null;
    }
}

const createTable = async () => {
    const query_create_users_table = `
        CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT NOT NULL,
            password TEXT NOT NULL
        );
    `;

    const quary_create_products_table = `
        CREATE TABLE IF NOT EXISTS products(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            img TEXT,
            desc TEXT,
            price INTEGER NOT NULL,
            mrp INTEGER,
            category TEXT NOT NULL
        )
    `

    try {
        const dbInstance = await db;
        await dbInstance.executeSql(query_create_users_table);
        await dbInstance.executeSql(quary_create_products_table);
    } catch (err) {
        console.log({ err });
    }
}

const getUsers = async () => {
    const query_select = 'SELECT * FROM users';
    return executeSqlQuary(query_select);
}

const getProducts = async () => {
    const query_select = 'SELECT * FROM products';
    return executeSqlQuary(query_select);
}

const loginUser = async (email: string, password: string) => {
    const query_login = 'SELECT * FROM users where email = ? and password = ?';
    const params = [email, password];

    return executeSqlQuary(query_login, params);
}

const registerUser = async (name: string, email: string, password: string) => {
    const query_insert = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const params = [name, email, password];

    return executeSqlQuary(query_insert, params);
}

const addProduct = async (name: string, img: string, desc: string, price: number, mrp: number, category: string) => {
    const query_insert = 'INSERT INTO products (name, img, desc, price, mrp, category) VALUES (?, ?, ?, ?, ?, ?)';
    const params = [name, img, desc, price, mrp, category];

    return executeSqlQuary(query_insert, params);
}

export { createTable, loginUser, registerUser, getUsers, addProduct, getProducts }