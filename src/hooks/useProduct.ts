import { useState } from "react";
import type { ProduitAssurance } from "../types";
import { apiClient } from "../data/axios";

export default function useProduct(){

    const [products, setProducts] = useState<ProduitAssurance[]>([]);

    const findProducts = async () => {
        const response: any = await apiClient.post('/secure/mobile/categories/v1',{});
        setProducts(response.result ?? ([] as ProduitAssurance[]));
    }


    return {
        findProducts,
        products,
        setProducts
    }
}
