import { useDispatch } from "react-redux"
import { deleteCard } from "../../api/likeKanbanApi"
import { removeCard } from "../../slices/cards"
import { ICard } from "../../types/apiResponses"
import './Card.scss'

const Card: React.FC<{ card: ICard }> = ({ card }) => {
    const dispatch = useDispatch()

    const handleClick = () => {
        deleteCard(card.id!)
            .then(() => dispatch(removeCard(card.id!)))
    }

    return (
        <div className="card">
            <div className="card__top">
                <button className="card__button" onClick={handleClick}>X</button>
            </div>
            <div className="card__id"><span className="card__id_white">id: </span>{card.id}</div>
            <div className="card__text">{card.text}</div>
        </div>
    )
}

export default Card
