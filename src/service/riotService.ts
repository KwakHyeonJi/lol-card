import { instance } from '../api'

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

            teamId: number
            timePlayed: number

            win: boolean

            kills: number
            deaths: number
            assists: number

            doubleKills: number
            tripleKills: number
            quadraKills: number
            pentaKills: number

            champExperience: number
            champLevel: number
            championName: string

            item0: number
            item1: number
            item2: number
            item3: number
            item4: number
            item5: number
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

export const getSummoner = async (name: string): Promise<SummonerResponse> => await instance.get(`/summoner/${name}`)

export const getMatchIdList = async (
    puuid: string,
    count?: number,
    startTime?: number,
    endTime?: number
): Promise<string[]> =>
    await instance.get(`/match/by-puuid/${puuid}/ids`, {
        params: {
            count,
            startTime,
            endTime,
        },
    })

export const getMatch = async (matchId: string): Promise<MatchResponse> => await instance.get(`/match/${matchId}`)
