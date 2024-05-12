from wtforms import SelectField, StringField, SubmitField, PasswordField
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Sign In')

class SignUpForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    age = StringField('Age', validators=[DataRequired()])
    username = StringField('Username', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    password2 = PasswordField('Password2', validators=[DataRequired()])
    submit = SubmitField('Sign Up')