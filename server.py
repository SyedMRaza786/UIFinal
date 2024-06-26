from flask import Flask, session,redirect, url_for
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
app.secret_key = 'your_secret_key'
import json
import datetime


# import lessons
with open('lessons.json') as f1:
    lessons = json.load(f1)

with open('quiz.json') as f2:
    quiz_questions = json.load(f2)
    

# ROUTES
@app.route('/')
def home():
   return render_template('home.html')   


@app.route('/learn/<lesson_id>', methods=['GET', 'POST'])
def learn(lesson_id):
    # Get the current timestamp and record it in the session for GET requests
    current_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    lessons_list = session.setdefault('lessons', [])
    # Update the timestamp for the existing lesson_id or append a new entry if it doesn't exist
    lesson_index = next((i for i, lesson in enumerate(lessons_list) if lesson['lesson_id'] == lesson_id), None)

    if lesson_index is not None:
        # Update the timestamp if the lesson_id already exists
        lessons_list[lesson_index]['timestamp'] = current_time
    else:
        # Append a new entry if the lesson_id doesn't exist
        lessons_list.append({'lesson_id': lesson_id, 'timestamp': current_time})
    session['lessons'] = lessons_list
    
    if request.method == 'POST':
        # Process the form data if it's a POST request
        form_lesson_id = request.form.get('lesson_id')
        
        if form_lesson_id == lesson_id:
            selected_sentences = request.form.getlist('sentence')
            # Update the session with the list of selected sentences for the current lesson
            session.setdefault('lesson_selections', {})[lesson_id] = {
                'timestamp': current_time,
                'selected_sentences': selected_sentences
            }
        
       
        lesson = lessons[lesson_id]
        # Fetch the correct answers for the lesson
        correct_answers = lessons[lesson_id]['correct_answers'].split(',')
            # Generate results based on selected and correct answers
        results = {}

        # Loop through selected answers and mark them as "Correct" or "Incorrect"
        for idx in selected_sentences:
            if idx not in correct_answers:
                results[idx] = "Incorrect" 
            elif idx in correct_answers:
                results[idx] = "Correct"

        for idx in correct_answers:
            if idx not in selected_sentences:
                results[idx] = "Incorrect"

        for idx in range(1,5):
            if str(idx) not in selected_sentences and str(idx) not in correct_answers:
                results[str(idx)] = "Correct"

        return render_template('learn.html', lesson=lesson, selected_sentences=selected_sentences, results=results)
    
    # Render the learn.html template for GET requests
    lesson = lessons[lesson_id]
    return render_template('learn.html', lesson=lesson, selected_sentences=[], results=[])

@app.route('/quiz/<quiz_id>')
def quiz(quiz_id):
    question = quiz_questions[quiz_id]
    # Get the user's quiz answers from the session
    quiz_answers = session.get('quiz_answers', {})
    
    # Check if the user has answered the specific question
    answered_question = bool(quiz_answers.get(quiz_id))
    user_answer = None  # Default value if quiz_answers.get(quiz_id) returns None
    quiz_entry = quiz_answers.get(quiz_id)
    if quiz_entry is not None:
        user_answer = quiz_entry.get('selected_answer')

    correct_answer = True if user_answer is not None and int(user_answer) == int(question['answer']) else False

    return render_template('quiz.html', question = question, answered_question=answered_question, user_answer=user_answer, correct_answer=correct_answer) 

@app.route('/quiz/<quiz_id>', methods=['POST'])
def quiz_answer(quiz_id):
    question = quiz_questions[quiz_id]
    user_answer = request.json.get('selectedAnswer')
      # Get the quiz answers dictionary from the session, or create a new one if it doesn't exist
    quiz_answers = session.setdefault('quiz_answers', {})
    
    # Update the selected answer for the specific quiz question
    if quiz_id not in quiz_answers:
        quiz_answers[quiz_id] = {}
    
    quiz_answers[quiz_id].update({
        'selected_answer': user_answer
    })
    session['quiz_answers'] = quiz_answers

    return jsonify({'answer': question['answer']})

@app.route('/quiz/start')
def quiz_start():
    session.pop('quiz_answers', None)
    return render_template('quiz_start.html') 


@app.route('/quiz/results')
def quiz_results():
    quiz_answers = session.setdefault('quiz_answers', {})
    score = 0
    # calculate score
    for quiz_id, answer_data in quiz_answers.items():
        selected_answer = answer_data['selected_answer']
        if int(selected_answer) == int(quiz_questions[quiz_id]["answer"]):
            score +=1

    return render_template('quiz_results.html', score=score) 


# store user's choices in session
@app.route('/view_session')
def view_session():
    print(session)
    return redirect(url_for('home')) 

@app.route('/clear_session')
def clear_session():
    # Clear the session
    session.clear()
    # Redirect to a different route or page after clearing the session
    return redirect(url_for('home')) 

if __name__ == '__main__':
   app.run(debug = True)




