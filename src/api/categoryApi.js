import userClient from './userClient';
export const categoryApi = {
    getAll(params) {
        const url = '/categories';
        return userClient.get(url, { params })
    },
    get(id) {
        const url = `/categories/${id}`;
        return userClient.get(url);
    },
    add(data) {
        const url = `/categories/`;
        return userClient.post(url, data)
    },
    edit(data) {
        const url = `/categories/${data.id}`;
        return userClient.patch(url, data)
    },
    delete(id) {
        const url = `/categories/${id}`;
        return userClient.delete(url)
    }
}
