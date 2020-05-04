
var Sequelize = require('sequelize');

const dotenv = require('dotenv');
dotenv.config();

let dbName =process.env.DB_NAME;
let dbUser =process.env.DB_USER;
let dbPwd =process.env.DB_PWD;
let dbHost =process.env.DB_HOST;

console.log(`DB name: ${dbName}`);
const sequelize = 
new Sequelize(dbName,dbUser, dbPwd, 
				{ host: dbHost,
				  dialect: 'mysql',
				  pool: {
				    max: 5,
				    min: 0,
				    idle: 10000
				  },
				}
				);



var models = {};

models.User = sequelize.import(__dirname + "/model/User.js");
models.Role  = sequelize.import(__dirname + "/model/Role.js");

models.User.belongsToMany(models.Role, { through: 'user_role' });

sequelize.sync()
/*.then(()=>{
	 return Promise.all(
	 [
	 	models.User.create({
		    name: 'Irving',
		    rfc: 'Foo',
		    curp: 'Foo',
		    nss: 'Foo',
		    antiquity: new Date(1980, 6, 20)
  		})
		
     ,  models.Role.create({
		    name: 'Mesero',
		    rfc: 'Foo',
		    curp: 'Foo',
		    nss: 'Foo',
		    antiquity: new Date(1980, 6, 20)
  		})
  	])
 })
.then((values)=>{
	let [user, role] =  values;
	return user.addRole(role);
}).then((data)=>{
	return Promise.all([
		models.User.create({
		    name: 'Juan',
		    rfc: 'Foo',
		    curp: 'Foo',
		    nss: 'Foo',
		    antiquity: new Date(1980, 6, 20)
  		}),
		models.User.create({
			    name: 'Pedro',
			    rfc: 'Foo',
			    curp: 'Foo',
			    nss: 'Foo',
			    antiquity: new Date(1980, 6, 20)
	  		})]);
}).then((data)=>{
	console.log("DB populated");
});*/

sequelize.models=models;
module.exports = sequelize;




