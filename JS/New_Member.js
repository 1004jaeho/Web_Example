/* eslint-disable key-spacing */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable camelcase */

//  회원가입


$('.reset').click(() => {
    //  리셋
    window.location.href = "http://localhost:2019/HTML/New_Member.html";
});


$('#New_Member').click(() => {
  //  값들을 저장하였습니다.
    const id = $('#userid').val();
    const name = $('#username').val();
    const gender = $('#gender').val();
    const p_n = $('#Phone_Number').val();
    const e_m = $('#E_Mail').val();
    const age = $('#userage').val();
    const pw = $('#password').val();

    $.ajax({
        type: 'POST',
        data: {
        userid: id,
        username: name,
        gender,
        Phone_Number: p_n,
        E_mail: e_m,
        userage: age,
        password: pw,
        },
    url: '/HTML/New_Member',
        //  성공하면 여기 부분이 콜백됨
        success : function(res) {
        if (res === 'success') {
            window.location.href = 'http://localhost:2019/HTML/Login.html';
        }
        },
        //  실패하면 에러를 콜백함
        error : function(err) {
            alert(err);
        },
    });
});
