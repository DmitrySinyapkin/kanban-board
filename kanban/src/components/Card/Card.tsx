import { useEffect, useRef } from "react"
import { useDrag, useDrop } from "react-dnd"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { deleteCard, updateCard } from "../../api/likeKanbanApi"
import { modifyCard, removeCard } from "../../slices/cards"
import { RootState } from "../../store"
import { ICard } from "../../types/apiResponses"
import './Card.scss'

const Card: React.FC<{ card: ICard }> = ({ card }) => {
    const ref = useRef<HTMLDivElement>(null)
    const hoverRef = useRef(0)
    const dispatch = useDispatch()
    const rowCards = useSelector((state: RootState) => state.cards.cards
        .filter((item: ICard) => card.row === item.row)
        .sort((a: ICard, b: ICard) => a.seq_num! - b.seq_num!))

    hoverRef.current = card.seq_num!

    const moveCard = (dragIndex: number, hoverIndex: number) => {
        rowCards.forEach((item: ICard) => {
            if (dragIndex < hoverIndex && item.seq_num! > dragIndex && item.seq_num! < hoverIndex) {
                updateCard(item.id!, { row: item.row, text: item.text, seq_num: item.seq_num! - 1 })
                    .then((resp: ICard) => dispatch(modifyCard(resp)))
            }
            if (dragIndex > hoverIndex && item.seq_num! < dragIndex && item.seq_num! > hoverIndex) {
                updateCard(item.id!, { row: item.row, text: item.text, seq_num: item.seq_num! + 1 })
                    .then((resp: ICard) => dispatch(modifyCard(resp)))
            }
            if (item.seq_num === dragIndex) {
                updateCard(item.id!, { row: item.row, text: item.text, seq_num: hoverIndex })
                    .then((resp: ICard) => dispatch(modifyCard(resp)))
            }
        })
    }

    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect: (monitor: any) => {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item: ICard, monitor) => {
            if (!ref.current) {
                return
            }
            const dragIndex = item.seq_num
            const hoverIndex = card.seq_num

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()

            const hoverClientY = (clientOffset!).y - hoverBoundingRect.top

            if (dragIndex! < hoverIndex! && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex! > hoverIndex! && hoverClientY > hoverMiddleY) {
                return
            }

            moveCard(dragIndex!, hoverIndex!)
        },
    })

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

        rowCards
            .filter((item: ICard) => item.seq_num! > card.seq_num!)
            .forEach((item: ICard) => {
                updateCard(item.id!, { row: item.row, text: item.text, seq_num: item.seq_num! - 1 })
                    .then((resp: ICard) => dispatch(modifyCard(resp)))
            })
    }

    drag(drop(ref))

    return (
        <div className="card" ref={ref} style={{ opacity }}>
            <div className="card__top">
                <button className="card__button" onClick={handleClick}>X</button>
            </div>
            <div className="card__id"><span className="card__id_white">id: </span>{card.id}</div>
            <div className="card__text">{card.text}</div>
        </div>
    )
}

export default Card
