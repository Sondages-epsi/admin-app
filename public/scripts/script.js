$('#add').click(() =>{
	$('#questions tr:last').after('<tr><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td><td><input type="text"></td </tr>')
})

$('#remove').click(() =>{
	$('#questions tr:last').remove()
})

$('#sendButton').click(() =>{
	console.log('sent')
})