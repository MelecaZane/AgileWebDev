from flask import render_template, request, redirect, url_for, flash
from flask_login import current_user, login_required, login_user, logout_user
from app import flask_app
from app.forms import LoginForm, ExistingPostForm, SignUpForm
from app.models import Post, Game, Platform, User
from app import template_filters
from app import functions
from werkzeug.security import generate_password_hash, check_password_hash
from app import db, login

@flask_app.route("/", methods=["GET", "POST"])
@flask_app.route("/index.html", methods=["GET", "POST"])
@flask_app.route("/home", methods=["GET", "POST"])
def home_page():
    sorted_posts = sorted(Post.all_posts(), key=lambda x: x.post_date, reverse=True)
    join_form = ExistingPostForm()
    if request.method == "GET":
        return render_template("index.html", 
                            posts=sorted_posts,
                            title = "Home",
                            form = join_form)
    if request.method == "POST":
        post_to_update = Post.query.get(join_form.post_id.data)
        if post_to_update.found_players < post_to_update.player_amount and current_user.is_authenticated\
            and (post_to_update.found_player_list is None or current_user.user_id not in post_to_update.found_player_list.split(",")):
            post_to_update.found_players += 1
            if post_to_update.found_player_list is None:
                post_to_update.found_player_list = str(current_user.user_id)
            else:
                post_to_update.found_player_list += "," + str(current_user.user_id)
            current_user.in_post = post_to_update.post_id
            db.session.commit()
        return render_template("index.html", 
                            posts=sorted_posts,
                            title = "Home",
                            form = join_form)

@login.unauthorized_handler
def unauthorized():
    return redirect(url_for("login_page"))

@flask_app.route("/newPost", methods=["GET", "POST"])
@login_required
def new_post_page():
    if request.method == "GET":
        return render_template("newPost.html",
                               games=Game.game_list(),
                               platforms=Platform.platform_list(),
                               title="New Post")
    if request.method == 'POST':
        if functions.validate_post(request.json):
            if functions.add_post(request.json, current_user):
                return redirect(url_for("home_page"))
        flash("Server failed to validate post.")
        return "Invalid post", 400 #BAD REQUEST
    
@flask_app.route("/checkPlayers")
def check_players():
    game = request.args.get("game")
    if game == "None":
        return "0"
    return str(Game.query.filter(Game.game_title == game).first().max_players)
        
@flask_app.route("/howto")
@flask_app.route("/tutorial")
def how_to_page():
    return render_template("howTo.html", 
                           title="How-To")

@flask_app.route("/logIn", methods=["GET", "POST"])
def login_page():
    login_form = LoginForm()
    if request.method == "GET":
        return render_template("logIn.html", 
                                title="Login",
                                form = login_form)
    if request.method == "POST":
        user_email = login_form.email.data
        user = User.query.filter(User.email == user_email).first()
        if not user:
            flash("User not found.", 'error')
            return render_template("logIn.html", 
                                title="Login",        
                                form = login_form)
        
        password = login_form.password.data
        if not user.check_password(password):
            flash("Incorrect password.", 'error')
            return render_template("logIn.html", 
                                title="Login",
                                form = login_form)
        
        # If all successful, login the user
        login_user(user)
        return redirect(url_for("home_page"))
    
@flask_app.route("/signUp", methods=["GET", "POST"])
def sign_up_page():
    sign_up_form = SignUpForm()
    if request.method == "GET":
        return render_template("signUp.html", 
                                title="Sign-Up",
                                form = sign_up_form)
    if request.method == "POST":
        user_email = sign_up_form.email.data
        user = User.query.filter(User.email == user_email).first()
        if user:
            flash("User already exists.", 'error')
            return render_template("signUp.html", 
                                title="Sign-Up")
        
        if sign_up_form.age.data < 13:
            flash("You must be at least 13 years of age to sign up.", 'error')
            return render_template("signUp.html", 
                                title="Sign-Up",
                                form=sign_up_form)
        
        user_name = sign_up_form.username.data
        user = User.query.filter(User.username == user_name).first()
        if user:
            flash("Username already exists.", 'error')
            return render_template("signUp.html", 
                                title="Sign-Up",
                                form=sign_up_form)


        password = sign_up_form.password.data
        if password != sign_up_form.password2.data:
            flash("Passwords do not match.", 'error')
            return render_template("signUp.html", 
                                title="Sign-Up",
                                form=sign_up_form)
        
        db.session.add(User(username=user_name, email=user_email, password_hash=generate_password_hash(password),\
                            name=sign_up_form.name.data, age=sign_up_form.age.data))
        db.session.commit()
        login_user(User.query.filter(User.email == user_email).first())
        return redirect(url_for("home_page"))
        
    
@flask_app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("home_page"))