const express = require('express');
const router = express.Router();
const {productData} = require('../models/productModel');
const {KEY} = require("../config");

router.get("/",(req,res) => {
	headerAuth = req.get("Authorization");
	if(headerAuth !== KEY || !headerAuth){
		return res.json({
			err:"Unauthorized"
		});
	}
	else{
		productData.find({})

		.then(data => {

			res.json({
				data:data.map(singleData => singleData.serialize())
			});
		})
		.catch(err => {
			res.status(500).json({ message: 'Internal server error' });
		})
		
	}
	
});

module.exports = {router};