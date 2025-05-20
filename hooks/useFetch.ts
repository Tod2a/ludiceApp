/**
 * useFetch
 * ----------
 * A custom React hook for fetching data from an async function.
 * 
 * @template T - The type of the data returned by the fetchFunction.
 * @param fetchFunction - An async function that fetches and returns data.
 * @param autoFetch - Whether the data should be fetched automatically on mount (default: true).
 * 
 * @returns {
*   data: T | null,           // The data returned from the fetch function
*   loading: boolean,         // True while fetching
*   error: Error | null,      // Any error encountered during fetch
*   refetch: () => Promise<void>, // Manually trigger the fetch again
*   reset: () => void         // Reset the state (data, error, loading)
* }
* 
* Usage example:
* 
* const { data, loading, error, refetch, reset } = useFetch(() => fetchGames({ query: "catan" }));
*/

import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();

            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('an error occured'));
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null)
        setLoading(false);
        setError(null);
    }

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []);

    return { data, loading, error, refetch: fetchData, reset };
}

export default useFetch;