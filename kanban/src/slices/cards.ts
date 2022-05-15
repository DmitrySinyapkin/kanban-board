import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ICard } from "../types/apiResponses"

interface CardsState {
    cards: ICard[]
}

const initialState: CardsState = {
    cards: []
}

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        getAll: (state, action) => {
            state.cards = action.payload
        },
        addCard: (state, action: PayloadAction<ICard>) => {
            state.cards.push(action.payload)
        },
        modifyCard: (state, action: PayloadAction<ICard>) => {
            state.cards.splice(state.cards.findIndex((card: ICard) => card.id === action.payload.id), 1, action.payload)
        },
        removeCard: (state, action: PayloadAction<ICard>) => {
            state.cards.splice(state.cards.findIndex((card: ICard) => card.id === action.payload.id), 1)
        }
    }
})

export const { getAll, addCard, modifyCard, removeCard } = cardsSlice.actions
export default cardsSlice
