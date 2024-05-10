from wtforms import SelectField, StringField, SubmitField, PasswordField, IntegerField, HiddenField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Sign In')

class ExistingPostForm(FlaskForm):
    post_id = HiddenField()
    submit = SubmitField('Join')