import userClient from './userClient';
export const productApi = {
    async getAll(params) {
        const newParam = { ...params };
        newParam._start = !newParam._page || newParam._page <= 1 ? 0 : ((newParam._page - 1) * newParam._limit || 50);
        delete newParam._page;
        console.log(params);
        console.log(newParam);

        const productList = await userClient.get('/products', { params: newParam });
        const count = await userClient.get('/products/count', { params: newParam });
        return {
            data: productList,
            pagination: {
                page: params._page,
                limit: params._limit,
                count,
            }
        }

    },
    get(id) {
        const url = `/products/${id}`;
        return userClient.get(url);
    },
    edit(data) {
        const url=`/products${data.id}`
        return userClient.put(url, data)
    },
    add (data) {
        const url =`/product`
        return userClient.post(url, data)
    },
    delete(id) {
        const url =`/product/${id}`;
        return userClient.delete(url)
    }
}