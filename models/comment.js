// Definicion del modelo de comentarios

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'Comment',
    { texto: {
      type: DataTypes.STRING,
      validate: { notEmpty: {msg: "-> Falta Comentario"}}
    },
    publicado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
{
			classMethods: {
				countUnPublished: function(){
					return this.aggregate('QuizId', 'count', {'where': { 'publicado': false }}).then('success',function(count) {
						return count;
					})
				},
				countCommentQuizes: function(){
					return this.aggregate('QuizId', 'count', {'distinct': true }).then('success',function(count) {
						return count;
					})
				}
			}
		});
};
