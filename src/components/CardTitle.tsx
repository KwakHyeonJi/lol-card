import styled, { keyframes } from 'styled-components'

interface CardTitleProps {
    summonerName: string
    championName: string
    bestKda: string
}

const CardTitle = ({ summonerName, championName, bestKda }: CardTitleProps) => {
    return (
        <CardTitleLayout key={summonerName}>
            <p>PLAY OF THE GAME</p>
            <p>{summonerName}</p>
            <p>
                AS {championName} / KDA {bestKda}
            </p>
        </CardTitleLayout>
    )
}

const animate = keyframes`
    from {
        transform: translateX(-20%);
    }
    to {
        transform: translateX(0%);
    }
`

const CardTitleLayout = styled.div`
    position: absolute;
    bottom: 15%;
    left: 10%;
    font-family: 'koverwatch';
    font-style: italic;
    animation: ${animate} 0.8s ease;

    p:nth-child(1) {
        color: #fff;
        font-size: 2.5rem;
    }
    p:nth-child(2) {
        padding: 5px 0 5px 20px;
        color: #fcba03;
        font-size: 4rem;
    }
    p:nth-child(3) {
        padding: 0 0 0 60px;
        color: #fff;
        font-size: 1.5rem;
    }
`

export default CardTitle
