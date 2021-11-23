const bcrypt = require('bcrypt');
const auth = require('../../../auth')
const TABLA = 'auth';
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy')
    }
    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });
        console.log(data);
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales == true) {
                    // Generar token
                    // console.log("IGUALES.")
                    // console.log(data)
                    // console.log({ ...data })
                    return auth.sign({ ...data });
                } else {
                    throw new Error('Información invalida');
                }
            })
        // return data;
    }

    async function upsert(data, new_record) {
        // let new_record = true
        const authData = {
            id: data.id
        }
        if (data.id) {
            authData.username = data.username;
            // new_record = false;
        }
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }
        console.log("storing")
        return store.upsert(TABLA, authData, new_record)
    }

    return {
        upsert,
        login,
    };
};