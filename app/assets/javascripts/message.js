$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
      `<div class="messages">
        <div class="messages__main">
          <div class="message-top__sender">
            ${message.user_name}
          </div>
          <div class="message-top__date">
            ${message.date}
          </div>
          <div class="message-top__details">
            ${message.content}
          </div>
          <img src=${message.image} >
        </div>
      </div>`
      return html;
    } else {
      var html =
      `<div class="messages">
        <div class="messages__main">
          <div class="message-top__sender">
            ${message.user_name}
          </div>
          <div class="message-top__date">
            ${message.date}
          </div>
          <div class="message-top__details">
          ${message.content}
          </div>
        </div>
      </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    // console.logを用いてイベント発火しているか確認
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: "POST",  //同期通信でいう『HTTPメソッド』
      data: formdata,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $(".messages").append(html);
      $('form')[0].reset();
      $('.messages__main').animate({ scrollTop: $('.messages__main')[0].scrollHeight});
      $('.send__btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
});
