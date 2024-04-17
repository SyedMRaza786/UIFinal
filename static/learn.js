// Lesson JS

//Flashcards
// Loop through flashcards 
// {% for flashcard in lesson.flashcards %}
//   <p>{{ flashcard.title }}</p>
//   <img src="{{ flashcard.image_url }}" alt="Flashcard Image">
//   <p>{{ flashcard.text }}</p>
// {% endfor %}

function makeCard (flashcard){
	//card

	//card-front

	//card-back


};

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
}


//Functions called on start
$(document).ready(function(){
	updatePage();
	// console.log("lesson: ");
	// console.log(lesson);

});