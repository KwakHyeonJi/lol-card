import { useRouteError } from 'react-router-dom'

type Error = { statusText: string }

const ErrorPage = () => {
    const error = useRouteError() as Error

    return (
        <main>
            <h1>Oops!</h1>
            <p>{error.statusText}</p>
        </main>
    )
}

export default ErrorPage
