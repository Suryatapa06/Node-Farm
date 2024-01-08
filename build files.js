const path = require('path');
const indexPath = path.join('starter', 'txt', 'index.js');
console.log(indexPath);

//no 1 eg
//blocking code execution(synchronous)
const fs = require('fs');
const textIn = fs.readFileSync('./starter/txt/input.txt','utf-8');
console.log(textIn);

const textOut = `This is what we know about the avocado:${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./starter/txt/output.txt',textOut);
console.log('File written.');

//n0 2 eg
//Non-blocking ,asynchronous way
//readfile->start reading the start file without blocking the rest of the code execution
//using call-back function
 fs.readFile('./starter/txt/start.txt', 'utf-8',(err,data1) => {
    fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8',(err,data2) => {
    console.log(data2);
    fs.readFile('./starter/txt/append.txt', 'utf-8',(err,data3) => {
       console.log(data3);

       fs.writeFile('./starter/txt/final.txt',`${data2}\n${data3}`,'utf-8',err => {
          console.log('Your file has been writen');
       });      
    });
    });
 });

 //first the file will be read in line 18 with the location given and hence the output printed first is 'will read file' and then it will execute the other part line 11 ->err,data to print the data 'read-this'
 console.log('Will read this file!');

