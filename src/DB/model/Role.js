module.exports = function(sequelize, DataTypes){
	
	let Role = sequelize.define("role", 
		{
			name: DataTypes.STRING
		});
	return Role;
}