import { CARDS_URL, DELETE_METHOD, PATCH_METHOD, POST_METHOD, USERS_URL } from "../constants/likeKanbanApi"
import { LS_USER } from "../constants/localStorage"
import { ICard } from "../types/apiResponses"

const doGetOrDeleteRequest = async (url: string, method?: string) => {
    const token = JSON.parse(localStorage.getItem(LS_USER)!).token
    const options: RequestInit = {
        headers: new Headers({
            'Authorization': `JWT ${token}`
        })
    }
    if (method) {
        options.method = method
    }
    const res = await fetch(url, options)
    const data = await res.json()
    return data
}

const doRequestWithBody = async (url: string, method: string, body: BodyInit) => {
    const token = localStorage.getItem(LS_USER) ? JSON.parse(localStorage.getItem(LS_USER)!).token : ''
    const options = {
        method, 
        headers: {},
        body
    }
    if (token) {
        options.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        })
    } else {
        options.headers = new Headers({
            'Content-Type': 'application/json',
        })
    }
    const res = await fetch(url, options)
    const data = await res.json()
    return data
}

export const createUser = (username: string, password: string, email?: string) => {
    const url = USERS_URL + 'create/'
    const method = POST_METHOD
    const body = JSON.stringify({
        username,
        password,
        email
    })
    return doRequestWithBody(url, method, body)
}

export const loginUser = (username: string, password: string) => {
    const url = USERS_URL + 'login/'
    const method = POST_METHOD
    const body = JSON.stringify({
        username,
        password,
    })
    return doRequestWithBody(url, method, body)
}

export const getCards = () => {
    return doGetOrDeleteRequest(CARDS_URL)
}

export const createCard = (row: string, text: string) => {
    const url = CARDS_URL
    const method = POST_METHOD
    const body = JSON.stringify({
        row,
        text
    })
    return doRequestWithBody(url, method, body)
}

export const updateCard = (card: ICard) => {
    const url = CARDS_URL + `${card.id}/`
    const method = PATCH_METHOD
    const body = JSON.stringify({
        row: card.row,
        seq_num: card.seq_num,
        text: card.text
    })
    return doRequestWithBody(url, method, body)
}

export const deleteCard = (id: number) => {
    const url = CARDS_URL + `${id}/`
    const method = DELETE_METHOD
    return doGetOrDeleteRequest(url, method)
}
