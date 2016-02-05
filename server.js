var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Meet Mom for lunch',
	completed: false
	}, {
	id: 2,
	description: 'Go to market',
	completed: false
	}, {
	id: 3,
	description: 'Do laundry',
	completed: true
	}
];

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


app.listen(PORT, function () {
	console.log('Express listening on port ' + PORT);
})