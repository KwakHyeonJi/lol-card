import { Outlet } from 'react-router-dom'
import Title from '../components/Title'
import SearchBar from '../components/SearchBar'
import styled from 'styled-components'

const Root = () => {
    return (
        <RootLayout>
            <Title />
            <SearchBar />
            <Outlet />
        </RootLayout>
    )
}

const RootLayout = styled.main`
    padding: 8rem 0 4rem 0;
`

export default Root
