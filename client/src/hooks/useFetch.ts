import { useEffect, useState } from "react"

export enum FetchStatus {
    Idle = 'idle',
    Pending = "pending",
    Fulfilled = 'fulfilled',
    Error = 'error'
}

export function useFetch<T>(url: string)  {
    const [data, setData] = useState<T>()
    const [status, setStatus] = useState<FetchStatus>(FetchStatus.Idle)
    const [num, setNum] = useState(0)

    function reset() {
        setNum(Math.random())
    }

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
    }, [url, num])
    return {
        data,
        status,
        reset
    }
}