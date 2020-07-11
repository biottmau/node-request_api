// Simple http
var http = require('http');

/**
 * Get post request on API 
 * @param {*} url witout http://
 * @param {*} port  port
 * @param {*} endpoint  // Engpoint 
 * @param {*} data  // data to send 
 * @param {*} headers // head modifications
 */
const post = (url, port, endpoint, data, headers = null) => {
    return new Promise((resolve, reject) => {
        let options = {
            host: url,
            port: port,
            path: endpoint,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length,
                ...headers
            }
        };
        let req = http.request(options, (response) => {
            var sData = "";
            response.on('data', function (chunk) {
                sData += chunk;
            });
            response.on('end', function () {
                resolve(sData);
            });
        });
        req.on('error', (e) => {
            reject(e.message);
        });
        req.write(data);
        req.end();
    });
}
/**
 * Get  GET request API 
 * @param {*} url witout http://
 * @param {*} port  port
 * @param {*} endpoint  // Engpoint 
 * @param {*} headers // head modifications
 */
const get = (url, port, endpoint,headers = null) => {
    return new Promise((resolve, reject) => {
        let options = {
            host: url,
            port: port,
            path: endpoint,
            method: 'GEt',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };
        console.log(options);
        let req = http.request(options, (response) => {
            var sData = "";
            response.on('data', function (chunk) {
                sData += chunk;
            });
            response.on('end', function () {
                resolve(sData);
            });
        });
        req.on('error', (e) => {
            reject(e.message);
        });
        req.end();
    });
}


exports.post = post;
exports.get = get;