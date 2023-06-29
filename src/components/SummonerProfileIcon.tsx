import { styled } from 'styled-components'
import useImage from '../hooks/useImage'

interface SummonerProfileIconProps {
    id: number
}

const SummonerProfileIcon = ({ id }: SummonerProfileIconProps) => {
    const imagePath = `${process.env.REACT_APP_API_URL_PROFILE}/${id}.png`
    const { showSpinner, handleImageError } = useImage(id)

    return (
        <SummonerProfileIconLayout>
            {!showSpinner && <img src={imagePath} alt='summoner profile icon' onError={handleImageError} />}
        </SummonerProfileIconLayout>
    )
}

const SummonerProfileIconLayout = styled.div`
    position: relative;
    width: 80px;
    height: 80px;

    img {
        width: 100%;
        height: 100%;
        border-radius: 20px;
    }
`

export default SummonerProfileIcon
