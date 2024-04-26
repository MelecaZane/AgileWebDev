from flask import render_template
from app import flask_app
from app import elements
from app.models import Post, Game, Platform, User
from app import template_filters


@flask_app.route("/")
@flask_app.route("/index.html")
@flask_app.route("/home")
def home_page():
    post_list = Post.all_posts()
    return render_template("index.html", posts=post_list, head=elements.head("Home"), navbar=elements.navbar(), footer=elements.footer())

@flask_app.route("/newPost")
def new_post_page():
    return render_template("newPost.html", games=Game.game_list(), platforms=Platform.platform_list(), head=elements.head("New Post"), navbar=elements.navbar(), footer=elements.footer())

@flask_app.route("/howto")
@flask_app.route("/tutorial")
def how_to_page():
    return render_template("howTo.html", head=elements.head("How-To"), navbar=elements.navbar(), footer=elements.footer())

@flask_app.route("/signIn")
def sign_in_page():
    return render_template("signIn.html", head=elements.head("Sign-In"), navbar=elements.navbar(), footer=elements.footer())