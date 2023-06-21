import styled from 'styled-components'

interface MinimapProps {
    id: number
}

const Minimap = ({ id }: MinimapProps) => {
    return <MinimapLayout src={`${process.env.REACT_APP_API_URL_MINIMAP}/map${id}.png`} alt='minimap' />
}

const MinimapLayout = styled.img`
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 60px;
    height: 60px;
    border-radius: 20px;
    filter: brightness(0.6);
`

export default Minimap
