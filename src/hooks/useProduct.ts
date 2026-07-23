
import { useState } from "react";
import type { ProduitAssurance } from "../types";
import { useFetchClient } from "../context/FetchClientProvider";

export default function useProduct(){
    const [products, setProducts] = useState<ProduitAssurance[]>([]);
    const client = useFetchClient()
    const findProducts = async () => {
        const response: any = await client.fetch("secure/mobile/categories/v1", );
        console.log("response", JSON.stringify(response, null, 2));
        setProducts(response.result ?? ([] as ProduitAssurance[]));
    }
    return {
        findProducts,
        products,
        setProducts
    } 
}
