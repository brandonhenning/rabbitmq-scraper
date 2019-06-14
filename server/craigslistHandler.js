const cheerio = require('cheerio')


function getSearchParameters (message) {
    const url = `https://${message.location}.craigslist.org/search/sss?query=${message.searchTerm}`
    return url
}


function getResults (body) {
    const $ = cheerio.load(body)
    const rows = $('li.result-row')
    // why all these extra functions? just map the array
    return (rows || []).map(element => {
      const result = $(element)
      const imageData = result.find('a.result-image').attr('data-ids')
      
      return {
        link: result.find('.result-title').attr('href'),
        title: result.find('.result-title').text(),
        price: $(result.find('.result-price').get(0)).text(),
        timePosted: result.find('.result-date').text(),
        images: getImagesIfTheyExist(imageData)
      }
    });
}


// you don't need if/else in these next 2 functions. Just return the value
function checkResponseForListings (results) {
    return results.length > 0
}

function checkRequestForErrors (request) {
    if (request.params.location && request.params.searchTerm) {
        return request
    }
    /*
      would be better to throw error and handle elsewhere, ie:
      throw new Error('request parameters not formatted correctly, please adjust and resubmit.')
    */
    return 'Error, request parameters not formatted correctly, please adjust and resubmit.'
} 

function formatResultsToHTML (results) {
  // clearer way to generate html
  return (results || [])
    .reduce((prev, next) => `
      ${prev}
      <h3>${listing.title}</h3>
      <img src="${listing.images[0]}"></img>
      <h3>${listing.price}</h3>
      <a href>${listing.link}</a>
    `, '<h1>Listings</h1><br>');
}


function getImagesIfTheyExist (imageData) {
    if (imageData) {
        const parts = imageData.split(',')
        images = parts.map((id) => {
            return `https://images.craigslist.org/${id.split(':')[1]}_300x300.jpg`
        })
    } return images

    // have a default return value
}

function setSearchDate () {
    return Date().split(' ').slice(1, 4).join(' ')
}

module.exports = {
    getResults,
    formatResultsToHTML,
    checkResponseForListings,
    checkRequestForErrors,
    getImagesIfTheyExist,
    setSearchDate,
    getSearchParameters
}