import ChampionSplash from './ChampionSplash'
import CardTitle from './CardTitle'
import Minimap from './Minimap'
import { useCardState } from '../context/cardContext'

const CardFrontContent = () => {
    const { summonerName, bestChampion, bestKda, mapId } = useCardState()
    return (
        <>
            <ChampionSplash name={bestChampion} />
            <Minimap id={mapId} />
            {summonerName && <CardTitle summonerName={summonerName} championName={bestChampion} bestKda={bestKda} />}
        </>
    )
}

export default CardFrontContent
