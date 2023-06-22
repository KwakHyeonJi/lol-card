import styled from 'styled-components'
import { useCardState } from '../context/cardContext'
import CustomDoughnut from './CustomDoughnut'
import Kills from './Kills'

const Statistics = () => {
    const { matchCount, win, totalKills, totalAssists, totalDeaths, teamKills } = useCardState()

    const chartData = {
        winRate: {
            data: [win, matchCount - win],
            colors: ['#5383e8', '#e84057'],
            centerText: `${Math.round((win / matchCount) * 100)}%`,
            caption: `${win} wins ${matchCount - win} losses`,
        },
        avgKda: {
            data: [totalKills, totalAssists, totalDeaths],
            colors: ['#FF9900', '#00bba3', '#7b7a8e'],
            centerText: ((totalKills + totalAssists) / totalDeaths).toFixed(2),
            caption: 'Average KDA',
        },
        avgKillParticipation: {
            data: [totalKills + totalAssists, teamKills - (totalKills + totalAssists)],
            colors: ['#A57CFF', '#7b7a8e'],
            centerText: `${Math.round(((totalKills + totalAssists) / teamKills) * 100)}%`,
            caption: 'Kill Participation',
        },
    }

    return (
        <StatisticsLayout>
            <ChartSection>
                {Object.entries(chartData).map(([key, { data, colors, centerText, caption }]) => (
                    <CustomDoughnut key={key} data={data} colors={colors} caption={caption}>
                        {centerText}
                    </CustomDoughnut>
                ))}
            </ChartSection>
            <Kills />
        </StatisticsLayout>
    )
}

const StatisticsLayout = styled.div`
    display: flex;
    gap: 40px;
    align-items: center;
`

const ChartSection = styled.section`
    display: flex;
    gap: 20px;
    height: 150px;
`

export default Statistics
