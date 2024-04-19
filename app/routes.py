from flask import render_template
from app import flask_app

@flask_app.route("/")
def temp():
    return render_template("index.html")