import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getCards, refreshToken } from "../../api/likeKanbanApi"
import Category from "../../components/Category/Category"
import { getAll } from "../../slices/cards"
import { RootState } from "../../store"
import './Board.scss'

const Board: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user)

    const dispatch = useDispatch()

    const handleFirstLoading = () => {
        if (user.token) {
            getCards()
                .then((resp: any)=> {
                    if (resp.length > 0) {
                        dispatch(getAll(resp))
                    } else if (resp.detail === 'Signature has expired.') {
                        refreshToken().then(() => handleFirstLoading())
                    }
                })
                .catch(() => alert('Не получилось загрузить карточки!'))
        }
    }

    useEffect(() => {
        handleFirstLoading()
    }, [])

    const rows = [
        'ON HOLD',
        'IN PROGRESS',
        'NEEDS REVIEW',
        'APPROVED'
    ]

    if (!user.token) {
        return (
            <div className="board_none">
                <div><Link to={'/login'}>Войдите</Link> в аккаунт, чтобы использовать доску</div>
                <div>Нет аккаунта? <Link to={'/signup'}>Зарегистрируйтесь</Link></div>
            </div>
        )
    }

    return (
        <div className="board">
            <div className="board__container">
                {rows.map((row: string, index: number) => <Category key={index} category={index.toString()} header={row} />)}
            </div>
        </div>
    )
}

export default Board
