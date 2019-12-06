$(function(){
  function buildHTML(message){

    var message_image = ''
    if ( message.image ) {
        message_image = `<img src=${message.image}>`
    }

      var html =
        ` <div class="messages" data-message-id="${message.id}">
            <div class="message-top__sender">
              ${message.user_name}
            </div>
            <div class="message-top__date">
              ${message.date}
            </div>
            <div class="message-top__details">
              ${message.content}
            </div>
            ${message_image} 
          </div>`
      return html;
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
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      last_message_id = $('.messages:last').data('message-id');
      
      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: 'api/messages',
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        // console.log(messages)
        var insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function (message){
          insertHTML = buildHTML(message);
          $('.messages__main').append(insertHTML);
          $('.messages__main').animate({
            scrollTop: $('.messages__main')[0].scrollHeight
          }, 10);
        })
        //メッセージが入ったHTMLに、入れ物ごと追加
      })
      .fail(function() {
        console.log('error');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});



// if (messages.length !== 0) {
//   insertHTML += buildHTML(messages)
//   $('.messages__main').append(insertHTML);
//   $('.messages__main').animate({ scrollTop: $('.messages__main')[0].scrollHeight});
// }