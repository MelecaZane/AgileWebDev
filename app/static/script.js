$(function(){
    var $select = $(".1-100");
    for (i=1;i<=100;i++){
      $select.append($('<option></option>').val(i).html(i))
    }
  });

 $(document).ready(function() {
    $('#tags-input').on('keydown', function(e) {
        // Check if the key pressed is 'Enter'
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault(); // Prevent form submission
            e.stopPropagation(); // Stop event propagation

            var tagValue = $(this).val().trim();
            if (tagValue) {
                // Check if tag already exists
                var isDuplicate = false;
                $('.tag').each(function() {
                    if ($(this).text().slice(0, -1) === tagValue) { // Compare ignoring the remove button
                        // If duplicate, remove the existing tag
                        $(this).remove();
                        isDuplicate = true;
                    }
                });

                // Only add new tag if no duplicate was found
                if (!isDuplicate) {
                    $('<span class="tag">' + tagValue + '<span class="remove-tag">&times;</span></span>')
                        .insertBefore(this)
                        .find('.remove-tag')
                        .click(function() {
                            $(this).parent().remove();
                        });
                }
                // Clear the input
                $(this).val('');
            }
        }
    }).on('blur', function(e) {
        // Create a tag when the input loses focus and there's a value
        var tagValue = $(this).val().trim();
        if (tagValue) {
            // Check if tag already exists
            var isDuplicate = false;
            $('.tag').each(function() {
                if ($(this).text().slice(0, -1) === tagValue) { // Compare ignoring the remove button
                    // If duplicate, remove the existing tag
                    $(this).remove();
                    isDuplicate = true;
                }
            });

            // Only add new tag if no duplicate was found
            if (!isDuplicate) {
                $('<span class="tag">' + tagValue + '<span class="remove-tag">&times;</span></span>')
                    .insertBefore(this)
                    .find('.remove-tag')
                    .click(function() {
                        $(this).parent().remove();
                    });
            }
            // Clear the input
            $(this).val('');
        }
    });

    //Stop form submission when Enter is pressed anywhere in the form
    $('#newPostForm').on('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
});

/*  --------------  start of showHide.js for signin sign up forgot password page ---------------------------------------------*/


/* - activate the current page and deactivate the hidden page 
   - parameter mode: Active or Inactive */
   function actDeact(btnID,mode) {
	debugger;
	var btn = document.getElementById(btnID);

	if(mode == "Active"){
		btn.classList.add('active');
	}else{
		btn.classList.remove('active');
	}
}
/* show hide from switch botton */
function switchBtn(ShowOrHide) {
	var switchBtn = document.getElementById('form-switch-btn');
	if(ShowOrHide == 'Show'){
		switchBtn.style.display = '';
	}else{
		switchBtn.style.display = 'none';
	}
}

/* it changes the switch btn title to the current active form */
function setTitle(title){
	var formTitle = document.getElementById('form-title');
	formTitle.innerHTML = title;
}

/* it hides the current form and shows the form which is clicked by user */
function showHide(FormID,ShowOrHide){
	var Form = document.getElementById(FormID);

	if(ShowOrHide == "Show"){
		Form.style.display = 'block';
	}else{
		Form.style.display = 'none';
	}
}

/* it activate and show login form */
function showLogin(){
	
	setTitle("Login");

	showHide("login-form","Show");
	showHide("register-form","Hide");
	showHide("forgot-form","Hide");

	actDeact("login-btn","Active");
	actDeact("register-btn","Inactive");

	switchBtn("Show");
};

/* it activate and show registration form */
function showRegister(){
	debugger;
	setTitle("Registration");

	showHide("register-form","Show");
	showHide("login-form","Hide");
	showHide("forgot-form","Hide");

	actDeact("login-btn","Inactive");
	actDeact("register-btn","Active");

	switchBtn("Show");
};

/* it activate and show forgot password form */
function showForgot() {
	
	setTitle("Forgot Password");

	showHide("register-form","Hide");
	showHide("login-form","Hide");
	showHide("forgot-form","Show");

	actDeact("login-btn","Inactive");
	actDeact("register-btn","Inactive");
	switchBtn("Hide");
}


/* ----------------------------------end of showHide.js for signin signup forgot pages ------------------------------------*/


/* ---------------------------------- start of isValid.js for reset signin signup forgot pages ----------------------------*/ 

/* removes all error messages */
function removeError(){

	var allErrorMessage = document.getElementsByClassName('error-message');
	var allErrorFiled = document.getElementsByClassName('error-input');
	var i;

	for(i=(allErrorMessage.length - 1); i>=0; i--){
		allErrorMessage[i].remove();
	}
	
	for(i=(allErrorFiled.length-1);i>=0;i--){
		allErrorFiled[i].classList.remove('error-input');
	}
}

/* shows error message when validation not true */
function showError(InputBoxID,Message){

	var InputBox = document.getElementById(InputBoxID);
	InputBox.classList.add('error-input');
	InputBox.focus();

	var ErrorMessageElement = document.createElement("p");
	ErrorMessageElement.innerHTML = Message;
	ErrorMessageElement.classList.add('error-message');
	ErrorMessageElement.setAttribute("id",InputBoxID+'-error');

	InputBox.parentNode.insertBefore(ErrorMessageElement, InputBox.nextSibling);
	
}

/* checks if the email is valid */
function emailVal(email){

	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if(email == ""){
		return "Please fill the field.";
	}

	if(emailRegex.test(email) == false){
		return "This is not a valid email.";
	}

	return "valid";
}

/* checks if password is valid */
function passwordVal(password) {
	
	const minLength = 8;
	// const maxLength = 32;
	const letterNumberRegexSpecialChar = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

	if(password == ""){
		return "Please fill the field."
	}

	if (password.length < minLength) {   // || password.length > maxLength
		return "Password length should be minimum 8 & maximum 32 characters.";
	}

	if (!letterNumberRegexSpecialChar.test(password)) {
		return "Password should contain alphabetic, numeric and special characters.";
	}
	return "valid";
}

/* validate login email and password */
function loginVal() {
	removeError();

	var email = document.getElementById('login-email').value;
	var password = document.getElementById('login-pass').value;
	var PasswordValidationMessage;
	var	emailValidationMessage;

	emailValidationMessage = emailVal(email);
	if(emailValidationMessage != "valid"){
		showError('login-email',emailValidationMessage);
		return false;
	}
	
	PasswordValidationMessage = passwordVal(password);
	if(PasswordValidationMessage != "valid"){
		showError('login-pass',PasswordValidationMessage);
		return false;
	}
	
	return true;
}

/* validate registration name, email and password */
function registerVal(){

	removeError();

	var RegiName = document.getElementById('RegiName').value;
	var RegiEmailAddres = document.getElementById('RegiEmailAddres').value;
	var RegiPassword = document.getElementById('RegiPassword').value;
	var RegiConfirmPassword = document.getElementById('RegiConfirmPassword').value;

	var PasswordValidationMessage;
	var ConfirmPasswordMessage;
	var	emailValidationMessage;

	if(RegiName == ""){
		showError('RegiName',"Please fill the filed.");
		return false;
	}else if(RegiName.length < 3 || RegiName.length > 20){
		showError('RegiName',"Name should be minimum 3 and maximum 20 characters long.");
		return false;
	}

	emailValidationMessage = emailVal(RegiEmailAddres);

	if(emailValidationMessage != "valid"){
		showError('RegiEmailAddres',emailValidationMessage);
		return false;
	}
	
	PasswordValidationMessage = passwordVal(RegiPassword);
	if(PasswordValidationMessage != "valid"){
		showError('RegiPassword',PasswordValidationMessage);
		return false;
	}
	
	ConfirmPasswordMessage = passwordVal(RegiConfirmPassword);
	if(ConfirmPasswordMessage != "valid"){
		showError('RegiConfirmPassword',ConfirmPasswordMessage);
		return false;
	}

	if(RegiPassword != RegiConfirmPassword){
		showError('RegiConfirmPassword',"Password not match.");
		return false;
	}

	return true;
}

/* validate the email entered in forgot password page */
function forgotVal(){

	removeError();

	var forgotPassEmail = document.getElementById('forgotPassEmail').value;
	
	var	emailValidationMessage;
	emailValidationMessage = emailVal(forgotPassEmail);

	if(emailValidationMessage != "valid"){
		showError('forgotPassEmail',emailValidationMessage);
		return false;
	}
}


/* it validates paswords entered in the reset password page */
function resetVal(){

	removeError();

	var NewPassword = document.getElementById('NewPassword').value;
	var ConfirmNewPassword = document.getElementById('ConfirmNewPassword').value;

	var PasswordValidationMessage;
	var ConfirmPasswordMessage;
	
	PasswordValidationMessage = passwordVal(NewPassword);
	if(PasswordValidationMessage != "valid"){
		showError('NewPassword',PasswordValidationMessage);
		return false;
	}
	
	ConfirmPasswordMessage = passwordVal(ConfirmNewPassword);
	if(ConfirmPasswordMessage != "valid"){
		showError('ConfirmNewPassword',ConfirmPasswordMessage);
		return false;
	}

	if(NewPassword != ConfirmNewPassword){
		showError('ConfirmNewPassword',"Password not match.");
		return false;
	}

	return true;
}

/* ---------------------------------- end of isValid.js for reset signin signup forgot pages ----------------------------*/ 
