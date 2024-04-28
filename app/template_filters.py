from app import flask_app
from datetime import datetime

@flask_app.template_filter('datetime')
def time_to_string(time):
    return time.strftime("%H:%M")
flask_app.jinja_env.filters['datetime'] = time_to_string

@flask_app.template_filter('tag_list')
def tag_list(tags):
    return tags.split(",")
flask_app.jinja_env.filters['tag_list'] = tag_list