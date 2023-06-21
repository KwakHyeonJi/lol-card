import { useCallback, useState } from 'react'

const useInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value), [])
    const reset = useCallback(() => setValue(initialValue), [initialValue])

    return { value, handleChange, reset }
}

export default useInput
