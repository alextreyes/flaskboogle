from boggle import Boggle
from flask import Flask, render_template, request, session, jsonify

app = Flask(__name__)
app.secret_key = "secret_key"
boggle_game = Boggle()

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/begin")
def start_boggle():

    board = boggle_game.make_board()
    session["board"]=board
    if 'count' in session:
        session['count'] += 1
    else:
        session['count'] = 1

    times_played = session["count"]
    return render_template("boggle.html",board=board, times_played=times_played)


@app.route("/handle", methods=["POST"])
def handle_guess():
    board =session["board"]
    
    data = request.data.decode('utf-8').strip()  
    cleaned_data = data.replace('"','').strip()
    print(f"Received data: {cleaned_data}")
    # print(session["count"])

    with open('words.txt', 'r') as file:
        word_list = [word.strip().lower() for word in file.read().split()]  # Convert to lowercase

    if( cleaned_data in word_list):
        print("word is valid")
        if (boggle_game.check_valid_word(board,cleaned_data) == "ok"):
            response = {
                'result':'ok'
            }
        else:
            response ={
                'result':'not-on-board'
            }
        print(boggle_game.check_valid_word(board,cleaned_data))
    else: 
        response = {
            'result': 'not-a-word'
        }
    return jsonify(response)

@app.route("/handle_highscore",methods=["POST"])
def highscore():
    data = request.data.decode('utf-8').strip()  
    cleaned_data = data.replace('"','').strip()
    print(f"Received data: in highscore{cleaned_data}")

    if 'high_score' in session:
        if (session['high_score'] < int(cleaned_data)):
            print("new highscore set")
            session['high_score'] = int(cleaned_data)
    else:
        session['high_score'] = int(cleaned_data)
    high_score = session['high_score']

    return jsonify(high_score)



    