import styled from 'styled-components'

interface CardTextProps {
    summonerName: string
    championName: string
}

const CardText = ({ summonerName, championName }: CardTextProps) => {
    return (
        <CardTextLayout>
            <p>PLAY OF THE GAME</p>
            <p>{summonerName}</p>
            <p>AS {championName}</p>
        </CardTextLayout>
    )
}

const CardTextLayout = styled.div`
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

export default CardText
