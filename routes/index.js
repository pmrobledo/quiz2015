var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controller");
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var userController = require('../controllers/user_controller');
var statisticsController = require('../controllers/statistics_controller');
/* Pagina de entrada */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: [] });
});

// autoload de comandos con :quizId
router.param("quizId", quizController.load); // autoload :quizId
router.param('commentId', commentController.load); // autoload :commentId)

// Definicion de rutas de session
router.get('/login', sessionController.new);        // formulario login
router.post('/login', sessionController.create);    // crear session
router.get('/logout', sessionController.destroy);   // destruir sesion

/* quizes */
router.get("/quizes", quizController.index);
router.get("/quizes/:quizId(\\d+)",        quizController.show);
router.get("/quizes/:quizId(\\d+)/answer", quizController.answer);


/* New */
router.get('/quizes/new',     sessionController.loginRequired,  quizController.new);
router.post('/quizes/create', sessionController.loginRequired,  quizController.create);

/* edit */
router.get('/quizes/:quizId(\\d+)/edit', sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',      sessionController.loginRequired, quizController.update);

/* delete */
router.delete('/quizes/:quizId(\\d+)',   sessionController.loginRequired, quizController.destroy);

// comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',
                                                 sessionController.loginRequired, commentController.publish);

//Definición de rutas para estadísticas
router.get('/statistics', statisticsController.calculate, statisticsController.show);

/* Autor*/
router.get('/author',                      quizController.author);

module.exports = router;
