var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

// GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});
//GET /todos/:id
app.get('/todos/:id', function (req, res) {
	var todoId = req.params.id;
	var matchingTodo;
	for (var i = 0; i < todos.length; i++){
		todo = todos[i]
		if (todo.id.toString() === todoId) {
			matchingTodo = todo;
		};
	}
	if (typeof matchingTodo !== 'undefined') {
		//res.json(todos[req.params.id]);
		res.json(matchingTodo);
	}
	else {
		res.status(404).send();
	};
	//iterate over todos to find matching id, else return 404
	// res.send('Asking for Todo with id of ' + req.params.id);
	
});


//can only pass text back and forth
app.get('/', function (req, res) {
	res.send('Todo API Root');
});

//POST /todos
app.post('/todos', function (req, res) {
	var body = req.body;
	body["id"] = todoNextId;
	todos.push(body);
	todoNextId += 1;
	res.json(body);
});

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});