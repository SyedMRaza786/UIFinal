// Lesson JS
/** TODO:
* 1. Images
* 2. Audio
**/

//Flashcards based off of https://gist.github.com/code-boxx/82671620fc3543ee99fdc390e43b35b5

function makeCard (flashcard, idx){
	var card = "<div class = 'hide bCard padded' id = 'card_"+ idx+"' >"+
		`<div class="card" onclick="this.classList.toggle('flip')">
		<span class="front">${flashcard["title"]}</span>
		<div class="back">
			${flashcard["text"]}
			<img src = "${flashcard["image_url"]}" class="sm-img">
		</div>
		</div>`
		+"</div>";

	return card;
};


function makeCardBlock(){
	// 2 columns of flashcards
	var col_length = lesson.flashcards.length/2;
	
	for (let idx = 0; idx< lesson.flashcards.length; idx++){ 
		var card = makeCard(lesson.flashcards[idx], idx);
		if (idx<col_length){
			$(card).appendTo("#card-col-1");
		}
		else{
			$(card).appendTo("#card-col-2");
		}
	}
	
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
