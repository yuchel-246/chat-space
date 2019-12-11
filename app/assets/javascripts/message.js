$(function(){
  function buildHTML(message){

    var message_image = ''
    if ( message.image ) {
        message_image = `<img src=${message.image}>`
    }

      var html =
        ` <div class="messages" data-message-id="${message.id}">
            <div class="message-top-box">
              <div class="message-top-box__sender">
                ${message.user_name}
              </div>
              <div class="message-top-box__date">
                ${message.date}
              </div>
            </div>
            <div class="message-top__details">
              ${message.content}
              <div class="lower-message_image">
              ${message_image} 
              </div>
            </div> 
          </div>`
      return html;
    } 

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url, 
      type: "POST",  
      data: formdata,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $(".messages__main").append(html);
      $('form')[0].reset();
      $('.messages__main').animate({ scrollTop: $('.messages__main')[0].scrollHeight});
      $('.send__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  }) 


  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.messages:last').data('message-id');
      
      $.ajax({
        url: 'api/messages',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.messages__main').append(insertHTML);
          $('.messages__main').animate({
            scrollTop: $('.messages__main')[0].scrollHeight
          }, 10);
        })
      })
      .fail(function() {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});



