from app.models import Post, Game, Platform, User
from app import db
from datetime import datetime, timedelta
# Functions that are not routes themselves

def add_post(post_dict, current_user):
    #unpack dictionary
    title = post_dict["title"]
    game = Game.query.filter(Game.game_title == post_dict["game"]).first().game_id
    if game == None:
        return False
    player_amount = post_dict["players"]
    tags = ",".join(post_dict["tags"])
    platform = Platform.query.filter(Platform.platform_name == post_dict["platform"]).first().platform_id
    description = post_dict["description"]
    user_id = current_user.user_id

    db.session.add(Post(post_user_id=user_id, post_title=title, post_game_id=game, player_amount=player_amount,\
                        tags=tags, description=description, post_platform_id=platform))
    db.session.commit()
    return True

def validate_post(post_dict):
    #unpack dictionary
    title = post_dict["title"]
    game = post_dict["game"]
    player_amount = int(post_dict["players"])
    tags = post_dict["tags"]
    platform = post_dict["platform"]
    description = post_dict["description"]

    if title == "" or title.isspace():
        return False
    if game == "" or game.isspace(): #game as its title
        return False
    if type(player_amount) != int or player_amount < 1:
        return False
    if type(tags) != list:
        return False
    if platform in ["None", ""] or platform.isspace():
        return False
    if description == "" or description.isspace():
        return "Description is empty"
    return True

def check_expired(post_list):
    for post in post_list:
        if post.post_date + timedelta(hours=8) < datetime.now():
            users = User.query.filter(User.in_post == post.post_id).all()
            for user in users:
                user.in_post = None
            db.session.delete(post[0])
            db.session.commit()