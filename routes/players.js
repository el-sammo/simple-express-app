var express = require('express');
var router = express.Router();
var http = require('http');

router.get('/playerslist', function(request, response) {
	var players;

	var options = {
		host: '192.168.0.47',
		port: 2646,
		path: '/players'
	};

	var req = http.get(options, function(res) {
		// Buffer the body entirely for processing as a whole.
		var bodyChunks = [];
		res.on('data', function(chunk) {
			// You can process streamed parts here...
			bodyChunks.push(chunk);
		}).on('end', function() {
			players = Buffer.concat(bodyChunks);
console.log('players: '+ players);
			response.json(players);
			// ...and/or process the entire body here.
		})
	});

	req.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

});

module.exports = router;
