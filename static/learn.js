// Lesson JS
/** TODO:
* 1. Flashcards
* 2. Checkboxes
* 3. Images
* 4. Audio
**/

//Flashcards

function makeCard (flashcard){
	var card = "<div class = 'hide bCard' id = 'card"+"1"+"' >"+
		`<div class="card" onclick="this.classList.toggle('flip')">
		<span class="front">${flashcard["title"]}</span>
		<span class="back">${flashcard["text"]}</span>
		</div>`
		+"</div>";

	return card;
};


function makeCardBlock(){
	// 2 columns of flashcards
	// var col_length = lesson.flashcards.length%2;
	
	// for (let i = 0; i< 2; i++){
	// 	for (let j = 0; j<col_length; j++){

	// 	}
	// 	var col = 
	// 	$("<div class = 'col-6' id = 'card-col-"+i+"'>"

	// 	+"</div>"
	// 	);

	// $("#card_block").prepend(col);
	// }
	var card = makeCard(lesson.flashcards[0]);
	console.log(card);

	// var col = 
	// 	"<div class = 'col-6' id = 'card-col-test'>"
	// 	+ card
	// 	+"</div>";

	$(card).appendTo("#card-col-1");
	
}

function checkCards(){
	if( lesson.hasOwnProperty("flashcards")){
		// makeCard ("testFront", "testBack");
		makeCardBlock();
	}
}

$.fn.multiline = function(text){
    this.text(text);
    this.html(this.html().split("\\n").join("<br/>"));
    return this;
}

function updateTitle(new_title){
	$("#lesson_title").html(new_title);
}


function updateBody(new_body){
	$("#lesson_body").multiline(new_body);
}

function updatePage(){
	updateTitle(lesson["title"]);
	updateBody(lesson["body"]);
	checkCards();
}


//Functions called on start
$(document).ready(function(){
	updatePage();
	// console.log("lesson: ");
	// console.log(lesson);

});
