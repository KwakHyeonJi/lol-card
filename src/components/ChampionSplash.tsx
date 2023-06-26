import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Spinner from './Spinner'

interface CardBackgroundProps {
    name: string
}

const ChampionSplash = ({ name }: CardBackgroundProps) => {
    const splashImage = `${process.env.REACT_APP_API_URL_SPLASH}/${name}_0.jpg`
    const [isReady, setIsReady] = useState(false)
    const [hasError, setHasError] = useState(false)

    const handleImageError = () => {
        setHasError(true)
    }

    useEffect(() => {
        name && setIsReady(true)
    }, [name])

    return (
        <>
            {!isReady || hasError ? (
                <Spinner />
            ) : (
                <ChampionSplashLayout src={splashImage} alt={name} onError={handleImageError} />
            )}
        </>
    )
}
const ChampionSplashLayout = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    filter: brightness(0.9);
`

export default ChampionSplash
