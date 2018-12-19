const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
	id:{type:Number,unique:true},
	name:{type:String},
	images:{type:Array},
	quantity:{type:Number},
	lastModified:{type:String},
	classCode:{type:String},
	description:{type:String}
});

productSchema.methods.serialize = function(){
	return {
		id: this.id,
		name:this.name,
		images:this.images,
		quantity:this.quantity,
		lastModified:this.lastModified,
		classCode:this.classCode,
		description:this.description
	};
};

const productData = mongoose.model('product',productSchema);

module.exports = {productData};