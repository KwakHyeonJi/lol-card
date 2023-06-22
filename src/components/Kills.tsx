import styled from 'styled-components'
import { useCardState } from '../context/cardContext'

const Kills = () => {
    const { totalDoubleKills, totalTripleKills, totalQuadraKills, totalPentaKills } = useCardState()

    return (
        <KillsLayout>
            <li>
                Double Kills <span>{totalDoubleKills}</span>
            </li>
            <li>
                Triple Kills <span>{totalTripleKills}</span>
            </li>
            <li>
                Quadera Kills <span>{totalQuadraKills}</span>
            </li>
            <li>
                Penta Kills <span>{totalPentaKills}</span>
            </li>
        </KillsLayout>
    )
}

const KillsLayout = styled.ul`
    width: 100%;

    li {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
    }

    span {
        width: 35px;
        border-radius: 20px;
        background: #7b7a8e;
        text-align: center;
    }
`

export default Kills
