if (/android|iphone/i.test(navigator.userAgent)) {
  $("#2").attr("href", "/style.css");
} else {
  $("#2").attr("href", "/styl.css");
  if(window.location.pathname=="/"||window.location.pathname=="")$("#1").append(`<h1 class="desc"><b style="color:#5ee09b">PayziBot</b> - бот для вашего Discord-сервера!<br>
В данном боте есть множество команд! От <b style="color:#00ff00">help</b> до <b style="color:#f00">weather</b>!<br>
В боте есть несколько разделов, вот некоторые из них:<br>
Основные - в данной категории собраны основные команды.<br>
Игровые - эта категория нужна для развлечений. В ней собраны развлекательные команды, по типу: 8ball , time , day.<br>
Фото - в этой категории можно посмотреть фото животных или сделать своё изображение.<br>
Модерация - а здесь расположены команды для модерации!<br>
Статистика - различная статистика!.</h1>`)
}
