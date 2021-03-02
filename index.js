const fetch = require('node-fetch')
const _ = require('lodash')
const fs = require('fs')
const { url } = require('inspector')

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

const hasError = (json) => {
    return Object.keys(json).some((key) => ['Error', 'error'].includes(key))
}

const exportAllJSON = async (urls, path='./jsonExport.txt') => {
    if(typeof urls === 'string'){
        const structure = await responseStructure(urls)
        const data = `\n--- JSON Response for ${urls} ---\n${JSON.stringify(structure)}\n---`
        if (fs.existsSync(path)) {
            fs.appendFileSync(path, data)
        } else {
            const writeStream = fs.createWriteStream(path);
            writeStream.write(data);
            writeStream.end();
        }
    } else {
        try {
            if(urls.length) {
                    const structures = await Promise.all(urls.map(async (url) => {
                    const struct = await responseStructure(url)
                    return `\n--- JSON Response for ${url} ---\n${JSON.stringify(struct)}\n---`
                    }))
                    structures.map((data) => {
                        if (fs.existsSync(path)) {
                            fs.appendFileSync(path, data)
                        } else {
                            const writeStream = fs.createWriteStream(path);
                            writeStream.write(data);
                            writeStream.end();
                        }
                    })
            } else {
                throw 'Expected an array of URLs or a URL'
            }
        } catch(err) {
            throw err
        }
    }
} 

module.exports = {
    responseStructure,
    validate,
    hasError, 
    exportAllJSON
}