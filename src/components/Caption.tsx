import styled from 'styled-components'
import { useCardState } from '../context/cardContext'
import { secToTime } from '../utils/time'

const Caption = () => {
    const { matchCount, avgGameDuration } = useCardState()
    const [minutes, seconds] = secToTime(avgGameDuration)
    return (
        <CaptionLayout>
            <p>
                Recent <span>{matchCount}</span> Games
            </p>
            <p>
                Average Game Duration{' '}
                <span>
                    {minutes}:{seconds}
                </span>
            </p>
        </CaptionLayout>
    )
}

const CaptionLayout = styled.div`
    margin: 0 0 25px 0;

    span {
        font-size: 1.2rem;
    }
`

export default Caption
