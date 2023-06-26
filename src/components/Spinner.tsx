import styled, { keyframes } from 'styled-components'

interface SpinnerProps {
    type?: 'small'
}

const Spinner = ({ type }: SpinnerProps) => {
    return <>{type === 'small' ? <SmallSpinner /> : <BigSpinner />}</>
}

const animate = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

const SpinnerLayout = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    animation: ${animate} 0.8s ease infinite;
`

const BigSpinner = styled(SpinnerLayout)`
    width: 64px;
    height: 64px;
    margin: -32px 0 0 -32px;
    border: 8px solid transparent;
    border-top-color: #fcba03;
    border-bottom-color: #fcba03;
`

const SmallSpinner = styled(SpinnerLayout)`
    width: 32px;
    height: 32px;
    margin: -16px 0 0 -16px;
    border: 4px solid transparent;
    border-top-color: #fcba03;
    border-bottom-color: #fcba03;
`

export default Spinner
