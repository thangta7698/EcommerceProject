import { useEffect, useState } from 'react';
import { productApi } from '../../../../../api/productApi';


export const useGetProductDetail = (id) => {
    const [product, setNewProduct] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
            try {
                const data = await productApi.get(id)
                console.log(data);
                setNewProduct(data);
                console.log(product);
            }
            catch (error) {
                console.log(error);
            }
            setLoading(false);
        })()
    }, [id]
    )

    return { product, loading };
}

