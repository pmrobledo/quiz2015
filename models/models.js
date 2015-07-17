var path = require('path');
//Cargar Modelo ORM
var Sequelize = require('sequelize');
//Usar BBDD SQlite:
var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"}
);
//Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz; //Exportar definicion de tabla Quiz
// sequelize.sync() crea la tabla de preguntas en DB
sequelize.sync().success(function(){
// Success(..) ejecuta el manejador una vez creada la tabla
Quiz.count().success(function(count){
  if(count===0){   // tbla se inicializa solo si esta vacia
  Quiz.create({pregunta: 'Capital de Italia',
               respuesta: 'Roma'
})
.success(function(){console.log('Base de datos inicializada')});
  };
});
});
