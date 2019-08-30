/* eslint-disable no-console */
/* eslint-disable quotes */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable indent */

//  리셋
$('#reset').click(() => {
    window.location.href = 'http://localhost:2019/html/Write.html';
});
//  글쓰기
$('#Write').click(() => {
    const title = $('#Write_title').val();
    const text = $('#Write_text').val();
    const writer = $('#Write_writer').val();
    $.ajax({
    type: 'POST',
    data: { Write_title: title, Write_text: text, Write_writer: writer },
    url: '/HTML/Write',
    success(res) {
        if (res === 'success') {
            alert('글등록 성공');
            window.location.href = "http://localhost:2019/HTML/Board_List.html";
        } else {
            alert('글등록 실패');
            window.location.href = "http://localhost:2019/HTML/Write.html";
        }
    },
    error(err) {
            console.log(err);
            alert('실패');
        },
    });
});
