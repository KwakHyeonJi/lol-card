import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { getMatch, getMatchIdList, getSummoner } from '../service/riotService'
import CardFrontContent from './CardFrontContent'
import CardBackContent from './CardBackContent'
import { useCardUpdate } from '../context/cardContext'

const MATCH_COUNT = 10

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
                bestKda: ((kills + assists) / deaths).toFixed(2),
                win: total.win,
                avgGameDuration: total.timePlayed / matchCount,
                totalKills: total.kills,
                totalAssists: total.assists,
                totalDeaths: total.deaths,
                totalDoubleKills: total.doubleKills,
                totalTripleKills: total.tripleKills,
                totalQuadraKills: total.quadraKills,
                totalPentaKills: total.pentaKills,
                teamKills: total.teamKills,
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
            </CardBack>
        </CardLayout>
    )
}

const CardSide = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 20px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
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
