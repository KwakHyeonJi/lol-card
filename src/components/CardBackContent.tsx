import styled from 'styled-components'
import SummonerProfile from './SummonerProfile'
import Caption from './Caption'
import Statistics from './Statistics'

const CardBackContent = () => {
    return (
        <CardBackContentLayout>
            <SummonerProfile />
            <section>
                <Caption />
                <Statistics />
            </section>
        </CardBackContentLayout>
    )
}

const CardBackContentLayout = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 80px 60px;
    color: #fff;
`

export default CardBackContent
