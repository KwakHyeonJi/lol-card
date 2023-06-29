import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getMatch, getMatchIdList, getSummoner } from '../service/riotService'
import { useCardUpdate } from '../context/cardContext'
import CardFrontContent from './CardFrontContent'
import CardBackContent from './CardBackContent'

const MATCH_COUNT = 1
const NULL_VALUE = -1

const Card = () => {
    const { name } = useParams() as { name: string }
    const update = useCardUpdate()

    const { data: summoner } = useQuery({
        queryKey: ['summoner', name],
        queryFn: () => getSummoner(name),
        refetchOnWindowFocus: false,
        retry: 0,
    })

    const { data: matchIdList } = useQuery({
        queryKey: ['matchIdList', name],
        queryFn: () => getMatchIdList(summoner?.puuid ?? '', MATCH_COUNT),
        refetchOnWindowFocus: false,
        enabled: !!summoner,
    })

    const matchListQueries = useQueries({
        queries: (matchIdList ?? []).map((matchId) => {
            return {
                queryKey: ['match', matchId],
                queryFn: () => getMatch(matchId),
                refetchOnWindowFocus: false,
                enabled: !!matchId,
            }
        }),
    })

    const allQueriesSuccess = matchListQueries.length ? matchListQueries.every((result) => result.isSuccess) : false

    useEffect(() => {
        if (allQueriesSuccess) {
            const total = matchListQueries.reduce(
                (result, queryResult) => {
                    const { data: { info } = {} } = queryResult

                    if (!info) {
                        throw new Error('Match not found')
                    }

                    const { mapId, participants, teams } = info

                    const summonerPlay = participants.find((participant) => participant.summonerName === name)

                    if (!summonerPlay) {
                        throw new Error(`Summoner's play not found`)
                    }

                    const {
                        championName,
                        timePlayed,
                        teamId,
                        win,
                        kills,
                        deaths,
                        assists,
                        doubleKills,
                        tripleKills,
                        quadraKills,
                        pentaKills,
                    } = summonerPlay

                    const kda = (kills + assists) / deaths

                    result.timePlayed += timePlayed
                    result.win += win ? 1 : 0
                    result.teamKills += teams.find((team) => team.teamId === teamId)?.objectives.champion.kills || 0
                    result.kills += kills
                    result.deaths += deaths
                    result.assists += assists
                    result.doubleKills += doubleKills
                    result.tripleKills += tripleKills
                    result.quadraKills += quadraKills
                    result.pentaKills += pentaKills
                    result.best = result.best.kda < kda ? { championName, mapId, kda } : result.best

                    return result
                },
                {
                    timePlayed: 0,
                    win: 0,
                    teamKills: 0,
                    kills: 0,
                    deaths: 0,
                    assists: 0,
                    doubleKills: 0,
                    tripleKills: 0,
                    quadraKills: 0,
                    pentaKills: 0,
                    best: {
                        championName: '',
                        mapId: NULL_VALUE,
                        kda: 0,
                    },
                }
            )

            update({
                summonerName: summoner?.name ?? '',
                summonerLevel: summoner?.summonerLevel ?? NULL_VALUE,
                profileIconId: summoner?.profileIconId ?? NULL_VALUE,
                matchCount: matchIdList?.length ?? 0,
                mapId: total.best.mapId,
                bestChampion: total.best.championName,
                bestKda: total.best.kda.toFixed(2),
                win: total.win,
                avgGameDuration: matchIdList?.length ? total.timePlayed / matchIdList.length : 0,
                teamKills: total.teamKills,
                totalKills: total.kills,
                totalAssists: total.assists,
                totalDeaths: total.deaths,
                totalDoubleKills: total.doubleKills,
                totalTripleKills: total.tripleKills,
                totalQuadraKills: total.quadraKills,
                totalPentaKills: total.pentaKills,
            })
        }
    }, [name, allQueriesSuccess, matchIdList, matchListQueries, summoner, update])

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
    overflow: hidden;
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
