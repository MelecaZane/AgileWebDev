from app.model import User, Post, Game
from app.routes import post_list, game_list, platform_list, cheezelz
# Functions that are not routes themselves

def add_post(post_dict):
    def find_game(game_name):
        for game in game_list:
            if game.title == game_name:
                return game
        return None
    #unpack dictionary
    title = post_dict["title"]
    game = find_game(post_dict["game"])
    player_amount = post_dict["players"]
    tags = post_dict["tags"]
    platform = post_dict["platform"]
    description = post_dict["description"]

    post_id = post_list[-1].post_id + 1
    user = cheezelz

    post_list.append(Post(post_id, user, title, game, player_amount, tags, platform, description))

def validate_post(post_dict):
    #unpack dictionary
    title = post_dict["title"]
    game = post_dict["game"]
    player_amount = post_dict["players"]
    tags = post_dict["tags"]
    platform = post_dict["platform"]
    description = post_dict["description"]

    if title == "" or title.isspace():
        return False
    if game not in ["None", ""] or game.isspace():
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
