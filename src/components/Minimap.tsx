import styled from 'styled-components'
import useImage from '../hooks/useImage'

interface MinimapProps {
    id: number
}

const Minimap = ({ id }: MinimapProps) => {
    const imagePath = `${process.env.REACT_APP_API_URL_MINIMAP}/map${id}.png`
    const { showSpinner, handleImageError } = useImage(id)

    return (
        <MinimapLayout>
            {!showSpinner && <img src={imagePath} alt='minimap' onError={handleImageError} />}
        </MinimapLayout>
    )
}

const MinimapLayout = styled.div`
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 60px;
    height: 60px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
        filter: brightness(0.6);
    }
`

export default Minimap
