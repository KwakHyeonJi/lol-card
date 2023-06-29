import { createContext, useCallback, useContext, useState } from 'react'

const NULL_VALUE = -1

interface CardState {
    summonerName: string
    summonerLevel: number
    profileIconId: number
    matchCount: number
    mapId: number
    bestChampion: string
    bestKda: string
    avgGameDuration: number
    win: number
    teamKills: number
    totalKills: number
    totalAssists: number
    totalDeaths: number
    totalDoubleKills: number
    totalTripleKills: number
    totalQuadraKills: number
    totalPentaKills: number
}

type CardUpdate = (card: CardState) => void

const initialState: CardState = {
    summonerName: '',
    summonerLevel: NULL_VALUE,
    profileIconId: NULL_VALUE,
    matchCount: 0,
    mapId: NULL_VALUE,
    bestChampion: '',
    bestKda: '',
    win: 0,
    avgGameDuration: 0,
    teamKills: 0,
    totalKills: 0,
    totalAssists: 0,
    totalDeaths: 0,
    totalDoubleKills: 0,
    totalTripleKills: 0,
    totalQuadraKills: 0,
    totalPentaKills: 0,
}

interface CardContextProps {
    children: React.ReactNode
}

const CardProvider = ({ children }: CardContextProps) => {
    const [state, setState] = useState(initialState)

    const updateCard = useCallback((card: CardState) => {
        setState(card)
    }, [])

    return (
        <CardStateContext.Provider value={state}>
            <CardUpdateContext.Provider value={updateCard}>{children}</CardUpdateContext.Provider>
        </CardStateContext.Provider>
    )
}

const CardStateContext = createContext<CardState | null>(null)
const CardUpdateContext = createContext<CardUpdate | null>(null)

const useCardState = () => {
    const context = useContext(CardStateContext)
    if (!context) {
        throw new Error('useCardState must be used within a CardProvider')
    }
    return context
}

const useCardUpdate = () => {
    const context = useContext(CardUpdateContext)
    if (!context) {
        throw new Error('useCardUpdate must be used within a CardProvider')
    }
    return context
}

export { CardProvider, useCardState, useCardUpdate }
