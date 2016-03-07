import mongoose = require('mongoose');
import q =require('q');
let Schema = mongoose.Schema;

let DatabaseSchema = new Schema({
	FirstName :String,
	LastName :String,
	Email:{type:String,unique:true,required:true},
	Password:String,
	CreatedOn:{type:Date,default:Date.now()},
	FirebaseToken : String	 
})


let DatabaseSchemaSellmen = new Schema({
	FirstName :String,
	LastName :String,
	Email:{type:String,unique:true,required:true},
	Password:String,
	CreatedOn:{type:Date,default:Date.now()},
	FirebaseToken : String,
	AdminId :	String 
})


let UsersModel = mongoose.model("users",DatabaseSchema);
let UsersModelSellsmen = mongoose.model("userssellmen",DatabaseSchemaSellmen);

function saveUser(userData)
{
		let deffered = q.defer();
		let user = new UsersModel(userData);
		 
		user.save((err,userData)=>{
			if(err){
				console.log("There is an error found while saving user")
				console.log("err");
				deffered.reject("Error while recording user info");					
		}else{
			console.log("User Was Saved Successfully");
			deffered.resolve(userData);
		}
		})	
		return deffered.promise;
}



function saveSellsmen(userData)
{
		let deffered = q.defer();
		let user = new UsersModelSellsmen(userData);
		
		user.save((err,userData)=>{
			if(err){
				console.log("There is an error found while saving user")
				console.log("err");
				deffered.reject("Error while recording user info");					
		}else{
			console.log("User Was Saved Successfully");
			
			deffered.resolve(userData);
		}
		})	
		return deffered.promise;
}
function findUser(query){
	let deferred = q.defer();
	 UsersModel.findOne(query, function(err, record){
			if(err){
				console.log("Error in finding User");
				console.log(err);
 	 			deferred.reject("Error in finding User"); 
			} else {
				deferred.resolve(record);
			}
		});
	return deferred.promise; 
}

function getSalesmen(query)
{
		let deffered = q.defer();
		UsersModelSellsmen.find(query,function(err,record){
			if(err)
			{
				deffered.reject("Error in fecthing User");
			}else{
				
				deffered.resolve(record);
			}
			return deffered.promise;
		})
			
}
export{saveUser,findUser,saveSellsmen,getSalesmen,};














































