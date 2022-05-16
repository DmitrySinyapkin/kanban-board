import { useDrag } from "react-dnd"
import { useDispatch } from "react-redux"
import { deleteCard } from "../../api/likeKanbanApi"
import { removeCard } from "../../slices/cards"
import { ICard } from "../../types/apiResponses"
import './Card.scss'

const Card: React.FC<{ card: ICard }> = ({ card }) => {
    const dispatch = useDispatch()

    const [collect, drag, dragPreview] = useDrag(() => ({
        type: 'card',
        item: card,
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult()
            console.log(dropResult)
        }
    }))

    const handleClick = () => {
        deleteCard(card.id!)
            .then(() => dispatch(removeCard(card.id!)))
    }

    return (
        <div className="card" ref={drag}>
            <div className="card__top">
                <button className="card__button" onClick={handleClick}>X</button>
            </div>
            <div className="card__id"><span className="card__id_white">id: </span>{card.id}</div>
            <div className="card__text">{card.text}</div>
        </div>
    )
}

export default Card
