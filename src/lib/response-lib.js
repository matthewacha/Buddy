export const success = body => {
    return customResponse(200, body)
}

export const failure = body => {
    return customResponse(500, body)
}

const customResponse = (statusCode, body) => {
    return {
        statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(body)
    }
}
