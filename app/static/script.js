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

/* Login form validation */

$(document).ready(function() {
    // Function to check if a field is empty
    function fieldIsEmpty(field) {
        return $.trim($(field).val()) === "";
    }

    // Function to show error message
    function showError(field, message) {
        var feedback = $(field).next('.invalid-feedback');
        if (feedback.length === 0) { // If no error div exists, create one
            $(field).after('<div class="invalid-feedback" style="color: red; display:block;">' + message + '</div>');
        } else { // Update message if div already exists
            feedback.text(message).show();
        }
        $(field).addClass('is-invalid');
    }

    // Function to clear error message
    function clearError(field) {
        $(field).removeClass('is-invalid');
        $(field).next('.invalid-feedback').hide(); // Hide error message
    }

    // Email validation function
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Basic Form Validation
    $("#login").submit(function(event) {
        var isError = false;

        // Check required fields (email and password)
        $("#login-email, #login-pass").each(function() {
            if (fieldIsEmpty(this)) {
                showError(this, "This field is required.");
                isError = true;
            } else {
                clearError(this);
            }
        });

        // Validate email
        if (!isValidEmail($("#login-email").val())) {
            showError("#login-email", "Please enter a valid email address.");
            isError = true;
        } else {
            clearError("#login-email");
        }

        // Check if password is at least 6 characters long
        if ($("#login-pass").val().length < 6) {
            showError("#login-pass", "Password must be at least 6 characters long.");
            isError = true;
        } else {
            clearError("#login-pass");
        }

        if (isError) {
            event.preventDefault(); // Stop form submission
        }
        // If no error, form will submit normally
    });
});

/* Sign-up form validation */

$(document).ready(function() {
    // Function to check if a field is empty
    function fieldIsEmpty(field) {
        return $.trim($(field).val()) === "";
    }

    // Function to show error message
    function showError(field, message) {
        var feedback = $(field).next('.invalid-feedback');
        if (feedback.length === 0) { // If no error div exists, create one
            $(field).after('<div class="invalid-feedback" style="color: red; display:block;">' + message + '</div>');
        } else { // Update message if div already exists
            feedback.text(message).show();
        }
        $(field).addClass('is-invalid');
    }

    // Function to clear error message
    function clearError(field) {
        $(field).removeClass('is-invalid');
        $(field).next('.invalid-feedback').hide(); // Hide error message
    }

    // Email validation function
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Basic Form Validation
    $("#Sign-Up").submit(function(event) {
        var isError = false;

        // Check required fields
        $("#name, #username, #age, #email, #password, #password2").each(function() {
            if (fieldIsEmpty(this)) {
                showError(this, "This field is required.");
                isError = true;
            } else {
                clearError(this);
            }
        });

        // Validate email
        if (!isValidEmail($("#email").val())) {
            showError("#email", "Please enter a valid email address.");
            isError = true;
        } else {
            clearError("#email");
        }

        // Check if passwords match and are at least 6 characters long
        if ($("#password").val() !== $("#password2").val()) {
            showError("#password", "Passwords do not match!");
            showError("#password2", "Passwords do not match!");
            isError = true;
        } else if ($("#password").val().length < 6) {
            showError("#password", "Password must be at least 6 characters long.");
            showError("#password2", "Password must be at least 6 characters long.");
            isError = true;
        } else {
            if (!fieldIsEmpty("#password") && !fieldIsEmpty("#password2")) {
                clearError("#password");
                clearError("#password2");
            }
        }

        if (isError) {
            event.preventDefault(); // Stop form submission
        }
        // If no error, form will submit normally
    });
});


function isEmptyOrWhitespace(str){
    return str.trim().length === 0;
}

function validateNewPost(){
    var title = document.getElementById('title').value;
    var game = document.getElementById('game').value;
    var players = document.getElementById('players').value;
    var tags = $('.tag').map(function() { return $(this).text().slice(0, -1); }).get();
    var platform = document.getElementById('platform').value;
    var description = document.getElementById('description').value;

    // if required fields are blank
    if(isEmptyOrWhitespace(title) || isEmptyOrWhitespace(game) || isEmptyOrWhitespace(players) || isEmptyOrWhitespace(platform) || isEmptyOrWhitespace(description)){
        console.log("start " + game + " end")
		alert("Please fill all required fields");
        return false;
    }

    return true;

}

function sendPost(){
    if (validateNewPost()){
        var xhttp = new XMLHttpRequest();
        postData = {
            "title": document.getElementById('title').value,
            "game": document.getElementById('game').value,
            "players": document.getElementById('players').value,
            "tags": $('.tag').map(function() { return $(this).text().slice(0, -1); }).get(),
            "platform": document.getElementById('platform').value,
            "description": document.getElementById('description').value
        }
    
        xhttp.open("POST", "/newPost", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        console.log(JSON.stringify(postData));
        xhttp.send(JSON.stringify(postData));
    
        xhttp.onreadystatechange = function(){
            if(this.readyState == 4 && this.status == 200){
                console.log(location.origin)
                window.location.replace(location.origin)
            }
            if(this.readyState == 4 && this.status == 400){
                alert("Please enter a valid post.");
            }
        };
    }
}

function checkPlayers(){
    var xhttp = new XMLHttpRequest();
    var game = document.getElementById('game').options[document.getElementById('game').selectedIndex].text
    console.log(game)
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var players = parseInt(this.responseText) - 1 // -1 to exclude the current player

            var i, L = document.getElementById("players").options.length - 1;
            for(i = L; i >= 0; i--) {
                document.getElementById("players").remove(i);
            }

            for (let i = 1; i <= players; i++){
                var option = document.createElement("option");
                option.text = i;
                option.value = i;
                document.getElementById('players').add(option);
            }
        }
    }
    xhttp.open("GET", "/checkPlayers?game=" + game, true);
    xhttp.send();
}