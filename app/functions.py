from app.models import Post, Game, Platform, User
from app import db
# Functions that are not routes themselves

def add_post(post_dict):
    #unpack dictionary
    title = post_dict["title"]
    game = Game.query.all().filter(Game.game_id == post_dict["game"])
    if game == None:
        return False
    player_amount = post_dict["players"]
    tags = post_dict["tags"].join(",")
    platform = Platform.query.all().filter(Platform.platform_name == post_dict["platform"])
    description = post_dict["description"]

    user = 1 #STUB, NEED USER ID FROM LOGGED IN USER

    db.session.add(Post(post_user_id=user, post_title=title, post_game_id=game, player_amount=player_amount,\
                        tags=tags, description=description, post_platform_id=platform))
    return True

def validate_post(post_dict):
    #unpack dictionary
    title = post_dict["title"]
    game = int(post_dict["game"])
    player_amount = int(post_dict["players"])
    tags = post_dict["tags"]
    platform = post_dict["platform"]
    description = post_dict["description"]

    if title == "" or title.isspace():
        return False
    if type(game) != int or game < 1: #game as its game id
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