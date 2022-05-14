export const validateUsername = (username: string, successCallback: Function, emptyCallback: Function, failureCallback: Function) => {
    if (!username) {
        emptyCallback()
        return false
    } else if (/^[\w.@+-]+$/.test(username)) {
        successCallback()
        return true
    } else {
        failureCallback()
        return false
    }
}

export const validateEmail = (email: string, successCallback: Function, failureCallback: Function) => {
    const regexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i
    if (!email || regexp.test(email)) {
        successCallback()
        return true
    } else {
        failureCallback()
        return false
    }
}

export const validatePassword = (password: string, successCallback: Function, emptyCallback: Function, failureCallback: Function) => {
    if (!password) {
        emptyCallback()
        return false
    } else if (/^[\w.@+-]+$/.test(password)) {
        successCallback()
        return true
    } else {
        failureCallback()
        return false
    }
}

export const validateRepeatedPassword = (password: string, repeatedPassword: string, successCallback: Function, emptyCallback: Function, failureCallback: Function) => {
    if (!repeatedPassword) {
        emptyCallback()
        return false
    } else if (password !== repeatedPassword) {
        failureCallback()
        return false
    } else {
        successCallback()
        return true
    }
}
