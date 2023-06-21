import styled from 'styled-components'

const Title = () => {
    return (
        <TitleLayout>
            <h1>Your LoL Card</h1>
        </TitleLayout>
    )
}

const TitleLayout = styled.div`
    color: #fff;
    text-align: center;

    h1 {
        font-size: 2.5rem;
    }
`

export default Title
