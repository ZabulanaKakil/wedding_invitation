import { useEffect, useState } from 'react'

const COUNTER_URL =
  'https://badge-visitor-count.vercel.app/api/hit/tanvir-tasnia-wedding'

/** One count per address each day. A refresh does not add another visit. */
export function VisitCount() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    let ignore = false
    const load = () => {
      fetch(`${COUNTER_URL}?t=${Date.now()}`, { cache: 'no-store' })
        .then((response) => response.json())
        .then((data: { success?: boolean; value?: number }) => {
          if (ignore || !data?.success || !Number.isFinite(data.value)) return
          setCount(data.value as number)
        })
        .catch(() => {})
    }
    load()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <p className="visit-count" aria-live="polite">
      Total visits : {count ?? '…'}
    </p>
  )
}
