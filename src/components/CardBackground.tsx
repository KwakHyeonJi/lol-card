import styled from 'styled-components'

interface CardBackgroundProps {
    imagePath: string
    championName: string
}

const CardBackground = ({ imagePath, championName }: CardBackgroundProps) => {
    return <CardBackgroundLayout src={imagePath} alt={championName} />
}

const CardBackgroundLayout = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9);
`

export default CardBackground
