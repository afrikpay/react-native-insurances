
import { useState } from "react";
import type { ProduitAssurance } from "../types";
import { useFetchClient } from "../context/FetchClientProvider";

export default function useProduct(){
    const [products, setProducts] = useState<ProduitAssurance[]>([]);
    const fetch = useFetchClient()
    const findProducts = async () => {
        const request = new Request('/secure/mobile/categories/v1', { method: 'POST' });
        const response: any = await fetch.fetch(request);
        console.log("response", JSON.stringify(response, null, 2));
        setProducts(response.result ?? ([] as ProduitAssurance[]));
    }
    return {
        findProducts,
        products,
        setProducts
    } 
}
