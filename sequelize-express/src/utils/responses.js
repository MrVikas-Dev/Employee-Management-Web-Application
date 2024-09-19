
const okResponse = (response, body, message) => {
    return response.status(200).json({ success: true, data: body, message });
}

const badRequest = (response, message) => {
    return response.status(400).json({ success: false, message });
}

const notFound = (response, message) => {
    return response.status(404).json({ success: false, message });
}

const unAuthorizedAccess = async (response, message) => {
    return response.status(401).json({ success: false, message });
}

const serverError = (response, error) => {
    return response.status(500).json({ error });
}


module.exports = {
    serverError,
    okResponse,
    notFound,
    badRequest,
    unAuthorizedAccess
}