import styled, { keyframes } from 'styled-components'

const Spinner = () => {
    return <SpinnerLayout />
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
    width: 64px;
    height: 64px;
    margin: -32px 0 0 -32px;
    border-radius: 50%;
    border: 8px solid transparent;
    border-top-color: #fcba03;
    border-bottom-color: #fcba03;
    animation: ${animate} 0.8s ease infinite;
`

export default Spinner
