import { useState } from "react"
import { useDispatch } from "react-redux"
import { createCard } from "../../api/likeKanbanApi"
import { addCard } from "../../slices/cards"
import { ICard } from "../../types/apiResponses"
import Card from "../Card/Card"
import './Category.scss'

const Category: React.FC<{ cards: ICard[], category: string, header: string }> = ({ cards, category, header }) => {
    const [isCreatorOpen, setIsCreatorOpen] = useState(false)
    const [newText, setNewText] = useState('')

    const dispatch = useDispatch()

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
        <div className="category">
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
