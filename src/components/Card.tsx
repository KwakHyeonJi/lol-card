import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMatch, getMatchIdList, getSummoner } from '../service/riotService'
import { secToTime } from '../utils/time'
import { styled } from 'styled-components'
import CardFrontContent from './CardFrontContent'
import CardBackContent from './CardBackContent'
import { useCardUpdate } from '../context/cardContext'

const MATCH_COUNT = 1

const Card = () => {
    const { name } = useParams()
    const update = useCardUpdate()

    useEffect(() => {
        const makeCard = async (name: string) => {
            const { name: summonerName, puuid, summonerLevel: level, profileIconId } = await getSummoner(name)

            const matchIdList = await getMatchIdList(puuid, MATCH_COUNT)
            const matchCount = matchIdList.length

            const matchList = await Promise.all(
                matchIdList.map(async (matchId) => {
                    const { info } = await getMatch(matchId)
                    const { mapId, participants, teams } = info

                    const summonerPlay = participants.find((participant) => participant.summonerName === name)

                    if (!summonerPlay) {
                        return Promise.reject(new Error('Summoner not found'))
                    }

                    const teamKills =
                        teams.find((team) => team.teamId === summonerPlay.teamId)?.objectives.champion.kills || 0

                    return { ...summonerPlay, teamKills, mapId }
                })
            )

            const total = matchList.reduce(
                (result, match) => {
                    result.timePlayed += match.timePlayed
                    result.win += match.win ? 1 : 0
                    result.kills += match.kills
                    result.deaths += match.deaths
                    result.assists += match.assists
                    result.teamKills += match.teamKills
                    result.doubleKills += match.doubleKills
                    result.tripleKills += match.tripleKills
                    result.quadraKills += match.quadraKills
                    result.pentaKills += match.pentaKills
                    return result
                },
                {
                    timePlayed: 0,
                    win: 0,
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    teamKills: 0,
                    doubleKills: 0,
                    tripleKills: 0,
                    quadraKills: 0,
                    pentaKills: 0,
                }
            )

            const { championName, mapId, kills, deaths, assists } = matchList.sort(
                (a, b) => (b.kills + b.assists) / b.deaths - (a.kills + a.assists) / a.deaths
            )[0]

            update({
                summonerName,
                summonerLevel: level,
                profileIconId,
                matchCount,
                mapId,
                bestChampion: championName,
                bestKDA: ((kills + assists) / deaths).toFixed(2),
                winRate: `${Math.round((total.win / matchCount) * 100)}%`,
                avgPlaytime: secToTime(total.timePlayed / matchCount),
                avgKDA: ((total.kills + total.assists) / total.deaths).toFixed(2),
                avgKillParticipation: `${Math.round(((total.kills + total.assists) / total.teamKills) * 100)}%`,
                totalDoubleKills: total.doubleKills,
                totalTripleKills: total.tripleKills,
                totalQuadraKills: total.quadraKills,
                totalPentaKills: total.pentaKills,
            })
        }

        name && makeCard(name)
    }, [name, update])

    return (
        <CardLayout>
            <CardFront>
                <CardFrontContent />
            </CardFront>
            <CardBack>
                <CardBackContent />
                {/* 
                <p>승률 {info.winRate}</p>
                <p>평균 플레이 타임 {info.avgPlaytime}</p>
                <p>평균 KDA {info.avgKDA}</p>
                <p>평균 킬관여율 {info.avgKillParticipation}</p>
                <p>더블킬 {info.totalDoubleKills}</p>
                <p>트리플킬 {info.totalTripleKills}</p>
                <p>쿼드라킬 {info.totalQuadraKills}</p>
                <p>펜타킬 {info.totalPentaKills}</p>
                 */}
            </CardBack>
        </CardLayout>
    )
}

const CardSide = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    backface-visibility: hidden;
    transition: 0.5s ease;
`

const CardFront = styled(CardSide)`
    position: absolute;
    transform: rotateY(0deg);
`

const CardBack = styled(CardSide)`
    background: #31313c;
    transform: rotateY(-180deg);
`

const CardLayout = styled.div`
    width: 800px;
    height: 500px;
    margin: 0 auto;
    perspective: 1000px;

    &:hover ${CardFront} {
        transform: rotateY(180deg);
    }

    &:hover ${CardBack} {
        transform: rotateY(0deg);
    }
`

export default Card
