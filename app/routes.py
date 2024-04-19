from flask import render_template
from app import flask_app
from app import elements

# Fake data for testing
from app.model import User, Post
cheezelz = User(23663079, "Cheezelz", "plaintext", "a@a.com")
oggy = User(5318008, "Oggy", "bowlord", "b@b.net")
vortex = User(12345678, "Vortex", "hunter2", "l@l.io")

post1 = Post(1, cheezelz, "LF1M Crota's End", "Destiny", 1, ["KWTD", "Titan", "Flawless"], "PS4", "Looking for one more to complete flawless raider Crota's end.")
post2 = Post(2, oggy, "LF2M VoG", "Destiny", 2, ["Chill", "Sherpa"], "PS4", "Looking for two more to complete VoG. New players welcome.")
post3 = Post(3, vortex, "LF1M Last Wish", "Destiny 2", 1, ["Experienced", "Hunter"], "PC", "Looking for one more to complete Last Wish. Must have experience.")

post_list = [post1, post2, post3]



@flask_app.route("/")
def temp():
    return render_template("index.html", posts=post_list, head=elements.head("Home"))