import { POST_METHOD, USERS_URL } from "../constants/likeKanbanApi"
import { LS_USER } from "../constants/localStorage"

const doGetRequest = async (url: string) => {
    const token = JSON.parse(localStorage.getItem(LS_USER)!).token
    const options: RequestInit = {
        headers: new Headers({
            'Authorization': `JWT ${token}`
        })
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
    const url = USERS_URL + '/create/'
    const method = POST_METHOD
    const body = JSON.stringify({
        username,
        password,
        email
    })
    return doRequestWithBody(url, method, body)
}

export const loginUser = (username: string, password: string) => {
    const url = USERS_URL + '/login/'
    const method = POST_METHOD
    const body = JSON.stringify({
        username,
        password,
    })
    return doRequestWithBody(url, method, body)
}
