const http = require('http');
const axios = require('axios')

http.createServer((req, resp) => {
    const { headers, method } = req;
    let body = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();

        console.log(`Headers: ${JSON.stringify(headers)}`);
        console.log(`HTTP Method: ${method}`);
        console.log(`Body: ${body}`);
    });

    resp.writeHead(200, { 'Content-Type': 'text/html' })
    resp.write("HTTP request Successful!");
    resp.end();
}).listen(8080);

//Testing POST method
axios.post('http://localhost:8080/', {
        message: "Just a POST test!"
    })
    .then(response => {
        console.log(response.data)
    })
    .catch(error => {
        console.error(error)
    })