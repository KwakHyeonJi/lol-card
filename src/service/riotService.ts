import { krInstance, asiaInstance } from '../api'

interface SummonerResponse {
    name: string
    puuid: string
    summonerLevel: number
    profileIconId: number
}

interface MatchResponse {
    info: {
        mapId: number
        participants: {
            summonerName: string
            championName: string

            timePlayed: number
            teamId: number
            win: boolean

            kills: number
            deaths: number
            assists: number

            doubleKills: number
            tripleKills: number
            quadraKills: number
            pentaKills: number
        }[]
        teams: {
            teamId: number
            objectives: {
                champion: {
                    kills: number
                }
            }
        }[]
    }
}

export const getSummoner = async (name: string): Promise<SummonerResponse> =>
    await krInstance.get(`${process.env.REACT_APP_API_URL_SUMMONER}/${name}`)

export const getMatchIdList = async (
    puuid: string,
    count?: number,
    startTime?: number,
    endTime?: number
): Promise<string[]> =>
    await asiaInstance.get(`${process.env.REACT_APP_API_URL_MATCH}/by-puuid/${puuid}/ids`, {
        params: {
            count,
            startTime,
            endTime,
        },
    })

export const getMatch = async (matchId: string): Promise<MatchResponse> =>
    await asiaInstance.get(`${process.env.REACT_APP_API_URL_MATCH}/${matchId}`)
