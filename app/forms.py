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
    delete = SubmitField('Delete Post')

class SignUpForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    age = IntegerField('Age', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField('Password2', validators=[DataRequired()])
    submit = SubmitField('Sign Up')