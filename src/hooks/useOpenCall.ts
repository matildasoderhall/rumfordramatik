import type { WPOpenCall } from "@/models/wordpress";
import { getOpenCall } from "@/services/api";
import { useEffect, useState } from "react"

export const useOpenCall = () => {
    const [data, setData] = useState<WPOpenCall | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect (() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getOpenCall();
                setData(result);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unkown error');
            } finally {
                setLoading(false)
            }
        }

        fetchData();
    }, []);

    const isExpired = (() => {
        if (!data?.acf.application_deadline) return false;

        const rawDate = data.acf.application_deadline;

        const safeDateString = rawDate.replace('', 'T');
        return new Date(safeDateString) < new Date();
    })

    return { data, loading, error, isExpired };
}