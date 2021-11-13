const TABLA = 'auth';
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy')
    }
    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });

    }

    function upsert(data) {
        const authData = {
            id: data.id
        }
        if (data.id) {
            authData.username = data.username;
        }
        if (data.password) {
            authData.password = data.password;
        }
        return store.upsert(TABLA, authData)
    }

    return {
        upsert,
        login,
    };
};