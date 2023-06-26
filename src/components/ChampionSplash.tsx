import styled from 'styled-components'
import Spinner from './Spinner'
import useImage from '../hooks/useImage'

interface CardBackgroundProps {
    name: string
}

const ChampionSplash = ({ name }: CardBackgroundProps) => {
    const imagePath = `${process.env.REACT_APP_API_URL_SPLASH}/${name}_0.jpg`
    const { showSpinner, handleImageError } = useImage(name)

    return (
        <ChampionSplashLayout>
            {showSpinner ? <Spinner /> : <img src={imagePath} alt={name} onError={handleImageError} />}
        </ChampionSplashLayout>
    )
}
const ChampionSplashLayout = styled.div`
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        object-fit: cover;
        filter: brightness(0.9);
    }
`

export default ChampionSplash
