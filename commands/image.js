const {client} = require("../constants");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { cse_api_key, cse_cx } = require('../config.json')

function getData(search) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", `https://www.googleapis.com/customsearch/v1?q=${search}&num=1&start=1&safe=active&searchType=image&key=${cse_api_key}&cx=${cse_cx}`, false)
    xmlHttp.send(null);
    let result = JSON.parse(xmlHttp.responseText)
    if (result["searchInformation"]["totalResults"] === '0'){
        return `Could not find any results for ${search}, please try again`;
    } else {
        return result["items"][0]["link"];
    }
}

module.exports = {
    name: 'image',
    aliases: ['image', 'i', 'simage'],
    description: 'Pulls the first image search result from google',
    options: [
        {
            "name": "query",
            "description": "Image you want to search for",
            "type": 'STRING',
            "required": true
        }
    ],
    execute: function (interaction) {
        interaction.reply(`${getData(interaction.options[0].value)}`);
    }
}