//creating server
const fs = require('fs');
const http = require('http');
const url = require('url');
 const replaceTemplate = require('./modules/replaceTemplate');


//using synchronous version -> blocks the code execution,only the top level code is executed once right in the beginning
//executed only once 
// const replaceTemplate = (temp, product) => {
//   console.log('Product:', product);
  
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
  
//   // Add a check for product.id
//   if (product.id !== undefined) {
//     output = output.replace(/{%ID%}/g, product.id);
//   } else {
//     console.error('Error: Product ID is undefined.');
//   }

//   if (!product.organic) {
//     output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//   }

//   return output;
// }


const tempOverview = fs.readFileSync('./starter/templates/template-overview.html','utf-8');
const tempCard = fs.readFileSync('./starter/templates/template-card.html','utf-8');
const tempProduct = fs.readFileSync('./starter/templates/template-product.html', 'utf-8');
  
  //res.writeHead(200, { 'Content-type': 'application/json'});
  //res.end(data);
 const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8');
 const dataObj =  JSON.parse(data);

 //using callback function ->execute each time that theoir is a new request
const server = http.createServer((req, res) => {
  
  const {query, pathname } = url.parse(req.url, true);


  //routing process
  //overview page
  if(pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html'});
    

    //map ->accepts callback function gets as an argument,the current element
    const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
    
 
    res.end(output) ; 

  //product page
  }else if(pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html'});
    
    const product = dataObj[query.id];
    //console.log(query);
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //API
  }else if(pathname === '/api') {
    
      res.writeHead(200, { 'Content-type': 'application/json'});
      res.end(data);
      
    //not found  
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello-world'
    });
    res.end('<h2>Page not found!</h2>');
  }
});
//'127.0.0.1' is the local host->standard ip address for the local host
//start listening incoming request or starting up the server
//127.0.0.1->local host , 80000->port no
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening to requests on port 3000');
})