import { SyntheticEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../../api/likeKanbanApi"
import { login } from "../../slices/user"
import { IUser } from "../../types/apiResponses"
import { validatePassword, validateUsername } from "../../utils/validators"
import './Login.scss'

const Login: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const usernameValidation = validateUsername(username, () => setUsernameMessage(''), () => setUsernameMessage('Введите имя!'), () => setUsernameMessage('Недопустимые символы'))
        const passwordValidation = validatePassword(password, () => setPasswordMessage(''), () => setPasswordMessage('Введите пароль!'), () => setPasswordMessage('Недопустимые символы'))
        if (usernameValidation && passwordValidation) {
            loginUser(username, password)
                .then((res: IUser) => {
                    if (res.token) {
                        dispatch(login({
                            token: res.token
                        }
                        ))
                        navigate('/')
                    } else {
                        alert('Неверный логин или пароль!')
                    }
                })
                .catch(err => alert('Ошибка регистрации!'))
        }
    }

    return (
        <div className="login">
            <h1>Вход</h1>
            <form className="login__form">
                <div className="field">
                    <label>Имя пользователя: <input className="form__input" type='text' value={username} onChange={(e) => setUsername(e.target.value)} /></label>
                    {usernameMessage && <div className="field__message">{usernameMessage}</div>}
                </div>
                <div className="field">
                    <label>Пароль: <input className="form__input" type='password' value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                    {passwordMessage && <div className="field__message">{passwordMessage}</div>}
                </div>
                <div className="form__controls"><button onClick={handleSubmit}>Войти</button></div>
            </form>
        </div>
    )
}

export default Login
