import { useLayoutEffect, useRef, useState } from "react"
import { useDrop } from "react-dnd"
import { useDispatch, useSelector } from "react-redux"
import { createCard, updateCard } from "../../api/likeKanbanApi"
import { addCard, modifyCard } from "../../slices/cards"
import { RootState } from "../../store"
import { ICard } from "../../types/apiResponses"
import Card from "../Card/Card"
import './Category.scss'

const Category: React.FC<{ category: string, header: string }> = ({ category, header }) => {
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)
    const [newText, setNewText] = useState('')

    const cards = useSelector((state: RootState) => state.cards.cards
        .filter((card: ICard) => card.row === category)
        .sort((a: ICard,b: ICard) => a.seq_num! - b.seq_num!))
    const dispatch = useDispatch()

    const total = useRef(0)

    useLayoutEffect(() => {
        total.current = cards.length
    }, [cards])

    const [{ handlerId }, drop] = useDrop(() => ({
        accept: 'card',
        collect: (monitor: any) => ({
            handlerId: monitor.getHandlerId(),
        }),
        drop: (item: ICard) => {
            updateCard(item.id!, { row: category, seq_num: total.current, text: item.text })
                .then((resp: ICard) => {
                    if (resp.id) {
                        dispatch(modifyCard(resp))
                    }
                })
        }
    }))

    const handleAddClick = () => {
        if (newText) {
            createCard(category, newText)
                .then((resp: ICard) => {
                    if (resp.id) {
                        dispatch(addCard(resp))
                        setNewText('')
                        setIsCreatorOpen(false)
                    }
                })
        }
    }

    const handleClose = () => {
        setIsCreatorOpen(false)
        setNewText('')
    }

    return (
        <div className="category" ref={drop}>
            <div className={`category__header category__header_${category}`}><span>{header}</span> <span>{`(${cards.length})`}</span></div>
            <div className="category__container">
                {cards.map((card: ICard) => <Card key={card.id} card={card} />)}
            </div>
            <div className="category__create">
                <div className={`create__text ${isCreatorOpen && 'create__text_opened'}`}>
                    <textarea className="text__input" placeholder="Введите заголовок для этой карточки" value={newText} onChange={(e) => setNewText(e.target.value)}></textarea>
                </div>
                <div className="create__controls">
                    {isCreatorOpen
                        ?
                        <div className="controls__wrapper">
                            <button className="controls__button_add" onClick={handleAddClick}>Добавить карточку</button>
                            <button className="controls__button_transparent" onClick={handleClose}>X</button>
                        </div>
                        :
                        <button className="controls__button_transparent" onClick={() => setIsCreatorOpen(true)}>+ Добавить карточку</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Category
