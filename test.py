import unittest
from app import app
from flask import Flask, session
from flask_session import Session
from boggle import Boggle




class FlaskTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        app.config['TESTING'] = True

    def test_highscore_route(self):
        with self.app as c:
            response = c.post("/handle_highscore", data='10')

            self.assertEqual(response.status_code, 200)

            high_score = session.get('high_score', None)

            self.assertEqual(high_score, 10)
    def test_home_route(self):
        with self.app as c:
            response = c.get("/")
            self.assertEqual(response.status_code, 200) 
    def test_begin_route(self):
        with self.app as c:
            response = c.get("/begin")
            self.assertEqual(response.status_code, 200)
            self.assertIn('board', session) 
            self.assertIn('count', session)    
    
def test_handle_guess_word_exists_on_board(self):
        with self.app as c:

            guessed_word = "apple"
            board = "paletohyns"  
            with c.session_transaction() as sess:
                sess['board'] = board

            response = c.post("/handle", data=guessed_word, content_type='text/plain')


            self.assertEqual(response.status_code, 200)


            response_data = response.get_json()
            self.assertEqual(response_data['result'], 'ok')           
