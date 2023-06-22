import ChampionSplash from './ChampionSplash'
import CardTitle from './CardTitle'
import Minimap from './Minimap'
import { useCardState } from '../context/cardContext'

const CardFrontContent = () => {
    const { summonerName, bestChampion, bestKDA, mapId } = useCardState()
    return (
        <>
            <ChampionSplash name={bestChampion} />
            <Minimap id={mapId} />
            <CardTitle summonerName={summonerName} championName={bestChampion} bestKDA={bestKDA} />
        </>
    )
}

export default CardFrontContent
