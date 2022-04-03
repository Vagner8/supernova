import { useEffect, useState } from "react"

export enum Status {
    Idle = 'idle',
    Pending = "pending",
    Fulfilled = 'fulfilled',
    Error = 'error'
}

export function useFetch<T>(trigger: number, url: string) {
    const [data, setData] = useState<T>()
    const [status, setStatus] = useState<Status>(Status.Idle)

    useEffect(() => {
        async function fetchData() {
            setStatus(Status.Pending)
            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
                setStatus(Status.Fulfilled)
            } catch (err) {
                setStatus(Status.Error)
            }
        }
        fetchData()
    }, [trigger, url])
    
    return {data, status}
}