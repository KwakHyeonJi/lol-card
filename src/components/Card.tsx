import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMatch, getMatchIdList, getSummoner } from '../service/riotService'
import { secToTime } from '../utils/time'
import CardBackground from './CardBackground'
import { styled } from 'styled-components'
import CardText from './CardText'

const MATCH_COUNT = 20

const Card = () => {
    const { name } = useParams()
    const [info, setInfo] = useState({
        summonerName: '',
        summonerLevel: 0,
        bestChampion: '',
        mapId: 0,
        kda: '',
        matchCount: 0,
        winRate: '',
        avgPlaytime: '',
        avgKDA: '',
        avgKillParticipation: '',
        totalDoubleKills: 0,
        totalTripleKills: 0,
        totalQuadraKills: 0,
        totalPentaKills: 0,
        profile: '',
        splash: '',
    })

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

        setInfo({
            summonerName,
            summonerLevel: level,
            bestChampion: championName,
            mapId,
            kda: ((kills + assists) / deaths).toFixed(2),
            matchCount,
            winRate: `${Math.round((total.win / matchCount) * 100)}%`,
            avgPlaytime: secToTime(total.timePlayed / matchCount),
            avgKDA: ((total.kills + total.assists) / total.deaths).toFixed(2),
            avgKillParticipation: `${Math.round(((total.kills + total.assists) / total.teamKills) * 100)}%`,
            totalDoubleKills: total.doubleKills,
            totalTripleKills: total.tripleKills,
            totalQuadraKills: total.quadraKills,
            totalPentaKills: total.pentaKills,
            profile: `${process.env.REACT_APP_API_URL_PROFILE}/${profileIconId}.png`,
            splash: `${process.env.REACT_APP_API_URL_SPLASH}/${championName}_0.jpg`,
        })
    }

    useEffect(() => {
        name && makeCard(name)
    }, [name])

    return (
        <CardLayout>
            <CardBackground imagePath={info.splash} championName={info.bestChampion} />
            <CardText summonerName={info.summonerName} championName={info.bestChampion} />
            <p>최근 {info.matchCount}게임 통계</p>
            <p>소환사명 {info.summonerName}</p>
            <p>레벨 {info.summonerLevel}</p>
            <p>(KDA 기준) 베스트 챔피언 {info.bestChampion}</p>
            <p>KDA {info.kda}</p>
            <p>맵 {info.mapId}</p>
            <p>승률 {info.winRate}</p>
            <p>평균 플레이 타임 {info.avgPlaytime}</p>
            <p>평균 KDA {info.avgKDA}</p>
            <p>평균 킬관여율 {info.avgKillParticipation}</p>
            <p>더블킬 {info.totalDoubleKills}</p>
            <p>트리플킬 {info.totalTripleKills}</p>
            <p>쿼드라킬 {info.totalQuadraKills}</p>
            <p>펜타킬 {info.totalPentaKills}</p>
            <img src={info.profile} alt='profile icon' />
        </CardLayout>
    )
}

const CardLayout = styled.div`
    position: relative;
    width: 800px;
    height: 500px;
    margin: 0 auto;
`

export default Card
