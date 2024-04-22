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

function testWhitespace(str){
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
    if(testWhitespace(title) || testWhitespace(game) || testWhitespace(players) || testWhitespace(platform) || testWhitespace(description)){
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