import { instance } from '../api'

export interface SummonerResponse {
    name: string
    puuid: string
    summonerLevel: number
    profileIconId: number
}

export interface MatchResponse {
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
    await instance.get(`/kr/summoner/v4/summoners/by-name/${name}`)

export const getMatchIdList = async (
    puuid: string,
    count?: number,
    startTime?: number,
    endTime?: number
): Promise<string[]> =>
    await instance.get(`/asia/match/v5/matches/by-puuid/${puuid}/ids`, {
        params: {
            count,
            startTime,
            endTime,
        },
    })

export const getMatch = async (matchId: string): Promise<MatchResponse> =>
    await instance.get(`/asia/match/v5/matches/${matchId}`)
