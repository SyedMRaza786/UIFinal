let selectedAnswer = 0
function playAudio(src) {
    const audio = new Audio(src);
    audio.play();
}

function tryAnswer(index) {
    const previous = document.querySelector('#answer' + selectedAnswer)
    if (previous !== null) {
        previous.classList.remove('selected-answer')
    }
    let current = document.querySelector('#answer' + index)
    current.classList.add('selected-answer')
    selectedAnswer = index
}

function checkAnswers() {
    fetch(window.location, { method: 'POST' })
        .then(response => response.json()
            .then(data => {
                const validAnswer = document.querySelector('#answer'+data['answer'])
                const curAnswer = document.querySelector('#answer'+selectedAnswer)
                validAnswer.classList.add('valid-answer')
                if(!validAnswer.classList.contains('selected-answer')){
                    curAnswer.classList.add('invalid-answer')
                }
            })
        )
}

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
