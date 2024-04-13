from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)


lessons = {
   "1":{
        "lesson_id": 1,
        "title": "lesson 1"
    },
    "2":{
        "lesson_id": 2,
        "title": "lesson 2"
    }
}

quiz_questions = {
   "1":{
        "quiz_id": 1,
        "question": "quesion 1"
    },
    "2":{
        "quiz_id": 2,
        "question": "question 2"
    }
}
    

# ROUTES
@app.route('/')
def home():
   return render_template('home.html')   


@app.route('/learn/<lesson_id>')
def learn(lesson_id):
    lesson = lessons[lesson_id]
    return render_template('learn.html', lesson = lesson) 

@app.route('/quiz/<quiz_id>')
def quiz(quiz_id):
    question = quiz_questions[quiz_id]
    return render_template('quiz.html', question = question) 



if __name__ == '__main__':
   app.run(debug = True)




