var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizId)); }
		}
	).catch(function (err) { next(err) })
}

// GET /quizes
exports.index = function(req, res) {
	var search = "";
	if (req.query.search) {
		search = "%" + req.query.search + "%";
		search = search.replace(' ', '%');
		models.Quiz.findAll({ where: ["pregunta LIKE ?", search]})
		.then(function(quizes) {renderQuizesView(quizes)})
		.catch(function(err) { next(err); });
	} else {
		models.Quiz.findAll()
		.then(function(quizes) {renderQuizesView(quizes)})
		.catch(function(err) { next(err); });
	}

	function renderQuizesView(quizes) {
		res.render('quizes/index.ejs', { quizes: quizes });
	}
}

// GET /quizes/:quizId
exports.show = function(req, res) {
	res.render('quizes/show.ejs', { quiz: req.quiz });
};

// GET /quizes/:quizId/answer
exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}
	res.render('quizes/answer.ejs', { quiz: req.quiz, respuesta: resultado });
}

// GET /author
exports.author = function(req, res) {
	res.render('author');
}
