const mysql = require('mysql');

const config = require('../config')
const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let connection;

function handleCon() {
    connection = mysql.createConnection(dbconfig);
    connection.connect((err) => {
        if (err) {
            console.error('[db error]', err)
            setTimeout(handleCon, 2000)
        } else {
            console.log('DB Connected!')
        }
    })

    connection.on('error', err => {
        console.log('[db err]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon();
        } else {
            throw err;
        }
    })
}
handleCon()


function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id = ${id} `, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        })
    })
}

function insert(table, data) {
    console.log("inserting " + data)
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ? `, data, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}
function update(table, data) {
    console.log("updating " + data)
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        })
    })
}

function upsert(table, data, isNew) {
    console.log("Upserting no microservice")
    if (data && isNew) {
        return insert(table, data);
    } else {
        return update(table, data);
    }
}
function query(table, query, join) {
    console.log("query")
    let joinQuery = ''
    return new Promise((resolve, reject) => {
        if (join) {
            const key = Object.keys(join)[0];
            const val = join[key];
            joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
        }
        // let query = 
        console.log(query)
        console.log(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`)
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) {
                console.log(err);
                return reject;
            }
            console.log(res);
            return resolve(res || null)
        })
    })
}

module.exports = {
    list,
    get,
    upsert,
    insert,
    // remove,
    query,
}