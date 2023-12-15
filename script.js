$(document).ready(function() {
    
    loadComments();

    
    $('#add-comment').on('click', function() {
        addComment();
    });

   
    $('#comments-container').on('click', '.delete-comment', function() {
        deleteComment(this);
    });

   
    $('#comments-container').on('click', '.edit-comment', function() {
        editComment(this);
    });

   
    $('#comments-container').on('click', '.save-edit', function() {
        saveEdit(this);
    });
});

function loadComments() {
   
    var comments = JSON.parse(localStorage.getItem('comments')) || [];

    
    comments.sort(function(a, b) {
        return b.timestamp - a.timestamp;
    });

    
    displayComments(comments);
}

function addComment() {
    var displayName = $('#display-name').val();
    var commentText = $('#comment').val();

    if (displayName && commentText) {
        
        var comment = {
            displayName: displayName,
            commentText: commentText,
            timestamp: new Date().getTime()
        };

        
        var comments = JSON.parse(localStorage.getItem('comments')) || [];

        
        comments.push(comment);

        
        localStorage.setItem('comments', JSON.stringify(comments));

       
        loadComments();
        $('#display-name').val('');
        $('#comment').val('');
    }
}

function deleteComment(button) {
    var index = $(button).data('index');

    
    var comments = JSON.parse(localStorage.getItem('comments')) || [];

   
    comments.splice(index, 1);

    
    localStorage.setItem('comments', JSON.stringify(comments));

    
    loadComments();
}

function editComment(button) {
    var index = $(button).data('index');

    var comments = JSON.parse(localStorage.getItem('comments')) || [];

    
    var comment = comments[index];

   
    var editInput = '<input type="text" class="edit-input" value="' + comment.commentText + '">';
    var saveButton = '<button class="save-edit" data-index="' + index + '">Save Edit</button>';
    $(button).parent().find('.comment-text').html(editInput);
    $(button).parent().append(saveButton);
    $(button).hide();
}

function saveEdit(button) {
    var index = $(button).data('index');

    
    var comments = JSON.parse(localStorage.getItem('comments')) || [];

    
    var editedText = $(button).parent().find('.edit-input').val();
    comments[index].commentText = editedText;

    $(button).parent().find('.edit-input').remove();
    $(button).remove();
    $(button).parent().find('.comment-text').html(editedText);

    
    localStorage.setItem('comments', JSON.stringify(comments));
}

function displayComments(comments) {
    $('#comments-container').empty();
    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        var commentElement = '<div class="comment">' +
                                '<strong>' + comment.displayName + '</strong>' +
                                '<p class="comment-text">' + comment.commentText + '</p>' +
                                '<button class="delete-comment" data-index="' + i + '">Delete</button>' +
                                '<button class="edit-comment" data-index="' + i + '">Edit</button>' +
                             '</div>';
        $('#comments-container').append(commentElement);
    }
}