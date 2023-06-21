import styled from 'styled-components'

interface CardBackgroundProps {
    name: string
}

const ChampionSplash = ({ name }: CardBackgroundProps) => {
    return <ChampionSplashLayout src={`${process.env.REACT_APP_API_URL_SPLASH}/${name}_0.jpg`} alt={name} />
}

const ChampionSplashLayout = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    object-fit: cover;
    filter: brightness(0.9);
`

export default ChampionSplash
