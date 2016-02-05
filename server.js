var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;

/* 
todo = {
	description = "String",
	completed = bool
}
*/
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

// GET /todos
app.get('/todos', function (req, res) {
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function (req, res) {
	//parses string to int
	var todoId = parseInt(req.params.id, 10);

	//http://underscorejs.org/#findWhere
	var matchingTodo = _.findWhere(todos, {id: todoId});

	if (typeof matchingTodo !== 'undefined') {
		//res.json(todos[req.params.id]);
		res.json(matchingTodo);
	}
	else {
		res.status(404).send();
	};
	
});


//can only pass text back and forth
app.get('/', function (req, res) {
	res.send('Todo API Root');
});

//POST /todos
app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	body.description = body.description.trim();
	//use _.pick to only pick description and completed
	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.length === 0) {
		//request can't be completed bad data ws provided
		return res.status(400).send();
	};

	body["id"] = todoNextId;
	todos.push(body);
	todoNextId += 1;
	res.json(body);
});

app.delete('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchingTodo = _.findWhere(todos, {id: todoId});

	if (typeof matchingTodo !== 'undefined') {
		todos = _.without(todos, matchingTodo);
		res.json(matchingTodo);
	}
	else {
		res.status(404).send();
	};
});

// DELETE /todos/:id
//	findwhere
//	update with without

app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});