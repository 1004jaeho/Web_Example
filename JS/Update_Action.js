/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-destructuring */
temp = location.href.split('?$idx=');
data = temp[1];
console.log(` data : ${data}`);

const idx = data;
console.log(`idx Update  : ${idx} `);

$('.Update_Action').click(() => {
  const title = $('#Update_title').val();
  const text = $('#Update_text').val();
  const writer = $('#Update_writer').val();

  $.ajax({
    url: '/HTML/Update_Action',
    data: {
      idx, title, text, writer,
    },
    type: 'POST',
    success(res) {
      console.log(res);
      if (res === 'success') {
        console.log(res);
        alert(res);
        window.location.href = 'http://localhost:2019/HTML/Board_List.html';
      }
    },
    error(err) {
      console.log(err);
    },

  });
});
