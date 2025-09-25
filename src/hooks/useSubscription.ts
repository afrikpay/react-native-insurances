import { useState } from "react";
import { apiClient } from "../data/axios";
import type { Souscription } from "../types";

export default function useSubscription(){

    const [souscriptions, setSouscriptions] = useState<Souscription[]>([]);

    const findSubscriptions = async (requestBody: any) => {
        const response: any = await apiClient.post(
            '/secure/mobile/insurance/subscription-list/v1',
            requestBody
        )
        setSouscriptions(response.result.subscriptions ?? ([] as Souscription[]));
    }

    return {
        findSubscriptions,
        souscriptions,
        setSouscriptions
    }
}
