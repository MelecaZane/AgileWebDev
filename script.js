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
                // Append the tag to the container
                $('<span class="tag">' + tagValue + '<span class="remove-tag">&times;</span></span>')
                    .insertBefore(this)
                    .find('.remove-tag')
                    .click(function() {
                        $(this).parent().remove();
                    });
                // Clear the input
                $(this).val('');
            }
        }
    }).on('blur', function(e) {
        // Create a tag when the input loses focus and there's a value
        var tagValue = $(this).val().trim();
        if (tagValue) {
            // Append the tag to the container
            $('<span class="tag">' + tagValue + '<span class="remove-tag">&times;</span></span>')
                .insertBefore(this)
                .find('.remove-tag')
                .click(function() {
                    $(this).parent().remove();
                });
            // Clear the input
            $(this).val('');
        }
    });

    // Optional: Stop form submission when Enter is pressed anywhere in the form
    $('#newPostForm').on('keydown', function(e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
});