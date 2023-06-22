import styled from 'styled-components'
import SummonerProfileIcon from './SummonerProfileIcon'
import { useCardState } from '../context/cardContext'

const CardBackContent = () => {
    const { profileIconId, summonerName, summonerLevel, matchCount } = useCardState()
    return (
        <CardBackContentLayout>
            <ProfileSection>
                <SummonerProfileIcon id={profileIconId} />
                <ProfileTextSection>
                    <p>{summonerName}</p>
                    <p>Lv. {summonerLevel}</p>
                </ProfileTextSection>
            </ProfileSection>
            <p>최근 {matchCount} 게임 분석</p>
        </CardBackContentLayout>
    )
}

const CardBackContentLayout = styled.div`
    padding: 80px 60px;
    color: #fff;
`

const ProfileSection = styled.section`
    display: flex;
    align-items: center;
    gap: 25px;
    margin: 0 0 20px 0;
`

const ProfileTextSection = styled.section`
    p:nth-child(1) {
        font-size: 1.5rem;
        font-weight: 600;
    }

    p:nth-child(2) {
        font-size: 1.2rem;
        font-weight: 500;
    }
`

export default CardBackContent
