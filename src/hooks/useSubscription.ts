import { useState } from "react";
import type { Souscription } from "../types";
import { useFetchClient } from "../context/FetchClientProvider";

export default function useSubscription(){

    const [souscriptions, setSouscriptions] = useState<Souscription[]>([]);
    const client = useFetchClient()

    const findSubscriptions = async (requestBody: any) => {
        const response: any = await client.fetch("secure/mobile/insurance/subscription-list/v1", {}, requestBody );
        setSouscriptions(response.result.subscriptions ?? ([] as Souscription[]));
    }
    return {
        findSubscriptions,
        souscriptions,
        setSouscriptions
    }
}
