const { nanoid } = require('nanoid');
const TABLA = 'post';
module.exports = function (injectedStore, injectedCache) {
    let store = injectedStore;
    let cache = injectedCache
    function list() {
        return store.list(TABLA);
    }

    async function get(id) {
        const user = await store.get(TABLA, id);
        if (!user) {
            throw error('No existe el post', 404);
        }

        return user;
    }

    async function upsert(data, user) {
        let isNew = false;
        const post = {
            id: data.id,
            user: user,
            text: data.text,
        }
        if (!post.id) {
            post.id = nanoid();
            isNew = true;
        }

        return store.upsert(TABLA, post, isNew).then(() => post);
    }

    async function like(post, user) {
        const like = await store.upsert(TABLA + '_like', {
            post: post,
            user: user,
        });

        return like;
    }

    async function postsLiked(user) {
        const users = await store.query(TABLA + '_like', { user: user }, { post: post });
        return users;
    }

    async function postLikers(post) {
        const users = await store.query(TABLA + '_like', { post: post }, { post: post });
        return users;
    }

    return {
        list,
        get,
        upsert,
        like,
        postsLiked,
        postLikers,
    }

}

