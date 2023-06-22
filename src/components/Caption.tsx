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
        display: inline-block;
        padding: 0 10px;
        border-radius: 20px;
        background: #7b7a8e;
    }
`

export default Caption
