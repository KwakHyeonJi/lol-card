import { useCallback, useEffect, useState } from 'react'

const useImage = (name: string | number) => {
    const [isReady, setIsReady] = useState(false)
    const [hasError, setHasError] = useState(false)

    const isValid = name !== '' && name !== -1
    const showSpinner = !isReady || hasError

    const startLoading = () => setIsReady(true)

    const handleImageError = useCallback(() => setHasError(true), [])

    useEffect(() => {
        isValid && startLoading()
    }, [isValid])

    return { showSpinner, handleImageError }
}

export default useImage
