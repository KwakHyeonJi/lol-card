import { styled } from 'styled-components'

interface SummonerProfileIconProps {
    id: number
}

const SummonerProfileIcon = ({ id }: SummonerProfileIconProps) => {
    return (
        <SummonerProfileIconLayout
            src={`${process.env.REACT_APP_API_URL_PROFILE}/${id}.png`}
            alt='summoner profile icon'
        />
    )
}

const SummonerProfileIconLayout = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 20px;
`

export default SummonerProfileIcon
