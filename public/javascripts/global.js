var playerListData = [];

$(document).ready(function() {
console.log('doc ready');
	populateTable();
	$('#playerList table tbody').on('click', 'td a.linkshowplayer', showPlayerInfo);
});

function populateTable() {
console.log('populateTable() called');
	var tableContent = '';

	$.getJSON( '/players/playerslist', function( data ) {
		playerListData = data;
console.log('data:');
console.log(data);
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td><a href="#" class="linkshowplayer" rel="' + this.username + '">' + this.username + '</a></td>';
			tableContent += '<td><a href="#" class="linkshowplayer" rel="' + this.fName + '">' + this.fName + '</a></td>';
			tableContent += '<td><a href="#" class="linkshowplayer" rel="' + this.lName + '">' + this.lName + '</a></td>';
			tableContent += '<td><a href="#" class="linkdeleteplayer" rel="' + this._id + '">delete</a></td>';
			tableContent += '</tr>';
		});

		// Inject the whole content string into our existing HTML table
		$('#playersList table tbody').html(tableContent);
	});
};

function showPlayerInfo(event) {
	event.preventDefault();
	var thisUserName = $(this).attr('rel');
	var arrayPosition = playerListData.map(function(arrayItem) { return arrayItem.username; }).indexOf(thisUserName);
	var thisPlayerObject = playerListData[arrayPosition];
	$('#playerInfoName').text(thisPlayerObject.fName + ' ' + thisPlayerObject.lName);
};
