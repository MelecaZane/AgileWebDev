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

function sendPost(){
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
    xhttp.send(JSON.stringify(postData));

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            // return redirect in flask
        }
    };
    
}
