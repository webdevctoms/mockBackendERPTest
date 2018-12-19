require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const {PORT, DATABASE_URL } = require('../config');
const {productData} = require('../models/productModel');
const {products} = require('./data');

mongoose.Promise = global.Promise;

const app = express();

let server;

function saveData(){

	productData.remove({}, function(){

	});

	for (let i = 0; i < products.length; i++){
		let data = new productData(products[i]);
		
		if (i !== products.length - 1){
			data.save();
		}
		else{
			data.save();
		}
	}
  console.log("done");
}

function runServer(databaseUrl, port=PORT){
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port and connected to mlab ${port}`);
        saveData();
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));

}

module.exports = {app, runServer, closeServer};