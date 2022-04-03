import { useEffect, useState } from "react"

export function useFetch<T>(url: string) : T | null {
    const [data, setData] = useState<T | null>(null)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(url)
            const json = await res.json()
            setData(json)
        }
        fetchData()
    }, [url])
    
    if (data) {
        return data
    }
    return null
}