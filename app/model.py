from datetime import datetime
#holdover until a database implemented

class Post:
    def __init__(self, post_id, user, title, game, player_amount, tags, platform, description):
        self.post_id = post_id
        self.user = user
        self.title = title
        self.game = game
        self.player_amount = player_amount
        self.tags = tags
        self.platform = platform
        self.description = description
        self.post_time = datetime.now().strftime("%H:%M")

class User:
    def __init__(self, user_id, username, password, email):
        self.user_id = user_id
        self.username = username
        self.password = password
        self.email = email

class Game:
    def __init__(self, game_id, title, max_players):
        self.game_id = game_id
        self.title = title
        self.max_players = max_players