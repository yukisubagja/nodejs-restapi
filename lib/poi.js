const axios = require('axios');
const cheerio = require('cheerio');

function getLatest(){
  return new Promise((resolve, reject) => {
    const url = 'http://nekopoi.care';
    axios.get(url)
      .then(req => {
        const title = [];
        const link = [];
        const image = [];
        const data = [];
        const soup = cheerio.load(req.data);
        soup('div.eropost').each(function(i, e) {
          soup(e).find('h2').each(function(j, s) {
            title.push(soup(s).find('a').text().trim());
            link.push(url + soup(s).find('a').attr('href'));
          });
          image.push(url + soup(e).find('img').attr('src'));
        });
        var i;
        for (i = 0; i < title.length; i++) {
          let isi = {
            "title": title[i],
            "image": image[i],
            "link": link[i]
          };
          data.push(isi);
        }
        if (data == undefined) {
          reject("No result :(");
        } else {
          var result = JSON.stringify(data, null, 2);
          resolve(result);
        }
      });
  });
};
function getInfo(url){
  return new Promise((resolve, reject) => {
    axios.get(url)
      .then(req => {
        try {
          const links = [];
          let soup = cheerio.load(req.data);
          let title = soup("title").text();
          soup('div.liner').each(function(i, e) {
            soup(e).find('div.listlink').each(function(j, s) {
              links.push(soup(s).find('a').attr('href'))
            });
          });
          const data = {
            "title": title,
            "links": links
          };
          resolve(data)
        } catch (err) {
          reject('Error : ' + err)
        }
      })
  });
};

module.exports = getInfo;
module.exports = getLatest;
