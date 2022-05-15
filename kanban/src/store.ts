import { configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./slices/cards";
import userSlice from "./slices/user";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cards: cardsSlice.reducer
    },
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export default store
