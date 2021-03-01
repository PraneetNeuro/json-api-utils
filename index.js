const fetch = require('node-fetch')
const _ = require('lodash')

const responseStructure = async (url) => {
    const response = await fetch(url)
    const jsonResponse = await response.json()
    const structure = {}
    Object.keys(jsonResponse).forEach(key => {
        structure[key] = typeof(jsonResponse[key])
    });
    return structure
}

const validate = async (url, structure) => {
    const structureOfResponse = await responseStructure(url)
    return _.isEqual(structure, structureOfResponse)
}

module.exports = {
    responseStructure,
    validate
}