import { useEffect, useState } from "react"

export enum FetchStatus {
    Idle = 'idle',
    Pending = "pending",
    Fulfilled = 'fulfilled',
    Error = 'error'
}

export function useFetch<T>(url: string) : T | FetchStatus {
    const [data, setData] = useState<T>()
    const [status, setStatus] = useState<FetchStatus>(FetchStatus.Idle)

    useEffect(() => {
        async function fetchData() {
            setStatus(FetchStatus.Pending)
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
                setStatus(FetchStatus.Fulfilled)
            } catch (err) {
                setStatus(FetchStatus.Error)
            }
        }
        fetchData()
    }, [url])
    
    if (!data) return status
    return data
}