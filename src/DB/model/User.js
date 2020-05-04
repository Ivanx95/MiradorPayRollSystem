
module.exports = function(sequelize, DataTypes){
  console.log("Creating users model")
  let User= sequelize.define('user', {
    name: DataTypes.STRING,
    rfc: DataTypes.STRING,
    curp: DataTypes.STRING,
    nss: DataTypes.STRING,
    antiquity : DataTypes.DATE
   
  });

  User.belongsTo(User,{as:"supervisor"});
  return User;
/*sequelize.sync().then(function() {
  return User.create({
    name: 'janedoe',
    rfc: 'Foo',
    curp: 'Foo',
    nss: 'Foo',
    antiquity: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});*/

}