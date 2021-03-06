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

//q for descriptipons
//?q=house
//?completed=false&q=work
"Go to work on Saturday".indexOf('work') > -1

// GET /todos
app.get('/todos', function (req, res) {
	//http://expressjs.com/en/api.html#req.query
	var queryParams = req.query;
	queryParams.q = queryParams.q.toLowerCase()
	var filteredTodos = todos;

	if (queryParams.hasOwnProperty('completed')) {
		if (queryParams.completed === "true") {
			filteredTodos = _.where(filteredTodos, {completed: true});
		}
		else if (queryParams.completed === "false") {
			filteredTodos = _.where(filteredTodos, {completed: false});
		};
	}

	if (queryParams.hasOwnProperty('q') && _.isString(queryParams.q) && queryParams.q.trim().length > 0) {
		
		queryTodos = _.filter(filteredTodos, function (todo){
			var description = todo.description.toLowerCase();
			return description.indexOf(queryParams.q) > -1;
		});
		filteredTodos = queryTodos;
	}

	res.json(filteredTodos);
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


//PUT /todos/:id
app.put('/todos/:id', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};
	var todoId = parseInt(req.params.id, 10);
	var matchingTodo = _.findWhere(todos, {id: todoId});

	if (!matchingTodo) {
		return res.status(404).send();
	}

	if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
		validAttributes.completed = body.completed;
	}
	else if (body.hasOwnProperty('completed')){
		return res.status(400).send();
	};

	if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
		validAttributes.description = body.description;
	}
	else if (body.hasOwnProperty('description')){
		return res.status(400).send();
	};
	_.extend(matchingTodo, validAttributes);
	res.json(matchingTodo);

	//UPDATE

});


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
});

