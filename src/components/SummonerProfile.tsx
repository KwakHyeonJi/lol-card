import styled from 'styled-components'
import SummonerProfileIcon from './SummonerProfileIcon'
import { useCardState } from '../context/cardContext'

const SummonerProfile = () => {
    const { profileIconId, summonerName, summonerLevel } = useCardState()
    return (
        <SummonerProfileLayout>
            <SummonerProfileIcon id={profileIconId} />
            <section>
                <p>{summonerName}</p>
                <p>Lv. {summonerLevel}</p>
            </section>
        </SummonerProfileLayout>
    )
}

const SummonerProfileLayout = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;

    section {
        p:nth-child(1) {
            font-size: 1.5rem;
            font-weight: 600;
        }

        p:nth-child(2) {
            font-size: 1.2rem;
            font-weight: 500;
        }
    }
`

export default SummonerProfile
