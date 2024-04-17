// Lesson JS
/** TODO:
* 1. Images
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

function makeSingleAudio(i, aux_clip){
	var audio_col = 
		`<div class="droppable ui-widget-header ui-state-default padded" data=${i} id ="drop_{i}">

			<div class='row' id = 'audio_row_${i}'>
				<div id = 'audio_${i}'>
					<audio controls>
						<source src='${aux_clip}' type="audio/mpeg">
						Your browser does not support the audio element.
					</audio>
				</div>
			</div>
		</div>`;
	return audio_col;
}

function makeAudioAnswer(i, answer){
	var html =
		$("<li class='ui-widget-content ui-corner-tr listI' data="+i+">"+
		"<div class='row align-items-start' "+
		"id ="+i+">" +
			"<div class='col'> <br>"+ answer + "<br> </div>" +
		"</div>"+
		'</li>');
	return html;	
}

function makeAudioBlock(){
	for (let i = 0; i<lesson.audio_clips.length; i++){
		var temp_audio = makeSingleAudio(i, lesson.audio_clips[i]["sound_url"]);

		var temp_answer = makeAudioAnswer(i, lesson.audio_clips[i]["answer"])
		
		$(temp_audio).appendTo("#audio-col");
		$(temp_answer).appendTo("#word-bank");
		
		temp_answer.draggable( {revert: "invalid"});
	}
	
}
function resetAudio(){
	window.location.reload();
};

function makeAudPractice(){
	for (let i = 0; i<lesson.audio_clips.length; i++){
		let aud = lesson.audio_clips[i]
		console.log(aud);
		var audio_col = 
			`<div class='row' id = 'desc_row_${i}'>
					<div id = 'aud_description_${i}'>
						${aud["text"]}
					</div>
				</div>

				<br>

				<div class='row' id = 'audio_row_${i}'>
					<div class = "col">
						<div id = 'audio_${i}'>
							<audio controls>
								<source src='${aud['sound_url']}' type="audio/mpeg">
								Your browser does not support the audio element.
							</audio>
						</div>
					</div>
					<div class = "col">
						${aud['answer']}
					</div>
				</div>
			</div>`;
		$(audio_col).appendTo("#audio-practice");
	}
}

function checkAudio(){
	if( lesson.hasOwnProperty("audio_clips") &! lesson.hasOwnProperty("skill_check") ){
		makeAudPractice();
	}

	else if( lesson.hasOwnProperty("audio_clips") && lesson.hasOwnProperty("skill_check") ){
		makeAudioBlock();
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
	checkAudio();
}


//Functions called on start
$(document).ready(function(){
	updatePage();

	$( ".droppable" ).droppable({
		classes: {
			"ui-droppable-hover": "lightYellow"
		},
		drop: function(event, ui) { 
			$(ui.draggable).draggable('disable');

			if ($(ui.draggable).attr("data") == $(this).attr("data") ){
				$(this).addClass('green');
				$(ui.draggable).addClass('green');     
			}
			else{
				$(this).addClass('red');
				$(ui.draggable).addClass('red');   

			}
		  }
	});
});
