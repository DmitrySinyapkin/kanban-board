import { useDrag } from "react-dnd"
import { useDispatch } from "react-redux"
import { deleteCard } from "../../api/likeKanbanApi"
import { removeCard } from "../../slices/cards"
import { ICard } from "../../types/apiResponses"
import './Card.scss'

const Card: React.FC<{ card: ICard }> = ({ card }) => {
    const dispatch = useDispatch()

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: card,
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging()
        })
    }))

    const opacity = isDragging ? 0 : 1

    const handleClick = () => {
        deleteCard(card.id!)
            .then(() => dispatch(removeCard(card.id!)))
            .catch(() => alert('Ошибка удаления карточки!'))
    }

    return (
        <div className="card" ref={drag} style={{opacity}}>
            <div className="card__top">
                <button className="card__button" onClick={handleClick}>X</button>
            </div>
            <div className="card__id"><span className="card__id_white">id: </span>{card.id}</div>
            <div className="card__text">{card.text}</div>
        </div>
    )
}

export default Card
