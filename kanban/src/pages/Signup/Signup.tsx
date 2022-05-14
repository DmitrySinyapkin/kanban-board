import { SyntheticEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createUser } from "../../api/likeKanbanApi"
import { login } from "../../slices/user"
import { IUser } from "../../types/apiResponses"
import { validateEmail, validatePassword, validateRepeatedPassword, validateUsername } from "../../utils/validators"
import './Signup.scss'

const Signup: React.FC = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [usernameMessage, setUsernameMessage] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')
    const [repeatPasswordMessage, setRepeatPasswordMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        const usernameValidation = validateUsername(username, () => setUsernameMessage(''), () => setUsernameMessage('Введите имя!'), () => setUsernameMessage('Недопустимые символы'))
        const emailValidation = validateEmail(email, () => setEmailMessage(''), () => setEmailMessage('Некорректный e-mail!'))
        const passwordValidation = validatePassword(password, () => setPasswordMessage(''), () => setPasswordMessage('Введите пароль!'), () => setPasswordMessage('Недопустимые символы'))
        const repeatPasswordValidation = validateRepeatedPassword(password, repeatPassword, () => setRepeatPasswordMessage(''), () => setRepeatPasswordMessage('Повторите пароль!'), () => setRepeatPasswordMessage('Пароли не совпадают'))
        if (usernameValidation && emailValidation && passwordValidation && repeatPasswordValidation) {
            createUser(username, password, email)
                .then((res: IUser) => {
                    if (res.token) {
                        dispatch(login({
                            token: res.token
                        }
                        ))
                        navigate('/')
                    }
                })
                .catch(err => alert('Ошибка регистрации!'))
        }
    }

    return (
        <div className="signup">
            <h1>Регистрация</h1>
            <form className="signup__form">
                <div className="field">
                    <label>Имя пользователя*: <input className="form__input" type='text' value={username} onChange={(e) => setUsername(e.target.value)} /></label>
                    {usernameMessage && <div className="field__message">{usernameMessage}</div>}
                </div>
                <div className="field">
                    <label>E-mail: <input className="form__input" type='text' value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                    {emailMessage && <div className="field__message">{emailMessage}</div>}
                </div>
                <div className="field">
                    <label>Пароль*: <input className="form__input" type='password' value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                    {passwordMessage && <div className="field__message">{passwordMessage}</div>}
                </div>
                <div className="field">
                    <label>Повторите пароль*: <input className="form__input" type='password' value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} /></label>
                    {repeatPasswordMessage && <div className="field__message">{repeatPasswordMessage}</div>}
                </div>
                <div className="form__controls"><button onClick={handleSubmit}>Зарегистрировать</button></div>
            </form>
        </div>
    )
}

export default Signup
