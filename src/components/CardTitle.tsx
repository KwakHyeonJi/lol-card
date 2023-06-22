import styled from 'styled-components'

interface CardTitleProps {
    summonerName: string
    championName: string
    bestKda: string
}

const CardTitle = ({ summonerName, championName, bestKda }: CardTitleProps) => {
    return (
        <CardTitleLayout>
            <p>PLAY OF THE GAME</p>
            <p>{summonerName}</p>
            <p>
                AS {championName} / KDA {bestKda}
            </p>
        </CardTitleLayout>
    )
}

const CardTitleLayout = styled.div`
    position: absolute;
    bottom: 15%;
    left: 10%;
    font-family: 'koverwatch';
    font-style: italic;

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
