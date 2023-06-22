import { createRoot } from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import GlobalStyle from './styles/GlobalStyle'
import ErrorPage from './pages/ErrorPage'
import Root from './pages/Root'
import Card from './components/Card'
import { CardProvider } from './context/cardContext'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route path='summoners/:name' element={<Card />} />
            </Route>
        </Route>
    )
)

createRoot(document.getElementById('root') as HTMLElement).render(
    <CardProvider>
        <GlobalStyle />
        <RouterProvider router={router} />
    </CardProvider>
)
