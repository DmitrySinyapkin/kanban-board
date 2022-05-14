import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../store"
import './Board.scss'

const Board: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user)

    if (!user.token) {
        return (
            <div className="board_none">
                <div><Link to={'/login'}>Войдите</Link> в аккаунт, чтобы использовать доску</div>
                <div>Нет аккаунта? <Link to={'/signup'}>Зарегистрируйтесь</Link></div>
            </div>
        )
    }

    return (
        <div className="board"></div>
    )
}

export default Board
