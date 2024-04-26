from app import db
from datetime import datetime

class Game(db.Model):
    game_id = db.Column(db.Integer, primary_key=True, nullable=False)
    game_title = db.Column(db.String(128), nullable=False)
    max_players= db.Column(db.Integer, nullable=False)

    posts = db.relationship('Post', back_populates='game')

class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    posts = db.relationship('Post', back_populates='user')

class Post(db.Model):
    post_id = db.Column(db.Integer, primary_key=True, nullable=False)
    post_user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    post_title = db.Column(db.String(128))
    post_game_id = db.Column(db.Integer, db.ForeignKey('game.game_id'), nullable=False)
    player_amount = db.Column(db.Integer, nullable=False)
    tags = db.Column(db.Text) # comma separated string of tags
    description = db.Column(db.Text)
    post_date = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    post_platform_id = db.Column(db.Integer, db.ForeignKey('platform.platform_id'), nullable=False)

    user = db.relationship('User', back_populates='posts')
    game = db.relationship('Game', back_populates='posts')
    platform = db.relationship('Platform', back_populates='posts')

    def all_posts():
        posts = Post.query.join(User, Post.post_user_id == User.user_id).join(Game, Post.post_game_id == Game.game_id).join(Platform, Post.post_platform_id == Platform.platform_id).add_columns(\
            Post.post_id, User.username, Game.game_title, Post.player_amount, Post.tags, Post.description, Post.post_date, Post.post_platform_id, Post.post_title).all()
        return posts

class Platform(db.Model):
    platform_id = db.Column(db.Integer, primary_key=True, nullable=False)
    platform_name = db.Column(db.String(64), nullable=False)

    posts = db.relationship('Post', back_populates='platform')