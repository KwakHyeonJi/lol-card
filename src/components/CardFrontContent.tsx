import ChampionSplash from './ChampionSplash'
import CardTitle from './CardTitle'
import Minimap from './Minimap'

interface CardFrontContentProps {
    summonerName: string
    championName: string
    bestKDA: string
    mapId: number
}

const CardFrontContent = ({ summonerName, championName, bestKDA, mapId }: CardFrontContentProps) => {
    return (
        <>
            <ChampionSplash name={championName} />
            <Minimap id={mapId} />
            <CardTitle summonerName={summonerName} championName={championName} bestKDA={bestKDA} />
        </>
    )
}

export default CardFrontContent
