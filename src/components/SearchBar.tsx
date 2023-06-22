import { useNavigate } from 'react-router-dom'
import useInput from '../hooks/useInput'
import styled from 'styled-components'
import { BiSearch } from 'react-icons/bi'

const SearchBar = () => {
    const navigate = useNavigate()
    const { value: name, handleChange, reset } = useInput('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        navigate(`summoners/${name}`)
        reset()
    }

    return (
        <SearchBarLayout>
            <form onSubmit={handleSubmit}>
                <input type='text' value={name} onChange={handleChange} placeholder='소환사명'></input>
                <button type='submit'>
                    <BiSearch size={25} />
                </button>
            </form>
        </SearchBarLayout>
    )
}

const SearchBarLayout = styled.div`
    margin: 1rem auto 4rem;
    width: 400px;
    height: 50px;

    form {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 1rem 2rem;
        height: 100%;
        border-radius: 50px;
        background: #31313c;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

        input {
            flex: 1;
            height: 100%;
            background: transparent;
            color: #fff;
        }

        button {
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
        }
    }
`

export default SearchBar
