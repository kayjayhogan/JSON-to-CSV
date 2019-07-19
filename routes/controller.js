const { parse } = require('querystring');

module.exports = {

  get: (req, res) => {
    res.render('index');
  },

  post: (req, res) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      let mid = parse(body).json_input;
      // handle if user put in string instead of obj
      if(mid[0] === '"' || mid[0] === "'") mid = mid.slice(1);
      if(mid[mid.length - 1] === '"' || mid[mid.length - 1] === "'") mid = mid.slice(0, mid.length - 1);
      let toConvert = JSON.parse(mid);
      let csv = module.exports.convertObjectToCSV(toConvert);
      res.render('converted', {csv: csv});
    });
  }, 

  convertNestedObjToArray: (obj) => {
    let result = [];

    function convertObj(object) {
      let smallObj= {};
      for(var key in object) {
        if(!Array.isArray(object[key])) {
          smallObj[key] = object[key];
        } 
      }
      result.push(smallObj);
      for(var key in object) {
        if(Array.isArray(object[key])) {
          object[key].forEach(function(innerObj) {
            convertObj(innerObj);
          });
        }
      }
    }

    convertObj(obj);
    return result;
  },

  convertObjectToCSV: (obj) => {  
    let arr = module.exports.convertNestedObjToArray(obj);

    let columnEnd = ',';
    let rowEnd = '\n';

    let keys = [];
    arr.forEach(function(obj) {
      for(var k in obj) {
        if(!keys.includes(k)) {
          keys.push(k);
        }
      }
    });

    let result = '';
    result += keys.join(columnEnd);
    result += rowEnd;
    arr.forEach(function(item) {
        let end = false;
        keys.forEach(function(key) {
          if (end) {
            result += columnEnd;
          } 
          if(item[key]) {
            result += item[key];
          } else {
            result += 'N/A';
          }
          end = true;
        });
        result += rowEnd;
    });

    return result;
  }

};