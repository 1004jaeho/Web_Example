/* url :  서버로 보낼 주소를 입력 */
$('#Login').click(function() {
    const id = $('#input_ID').val();
    const pw = $('#input_PW').val();
    $.ajax({
        type : 'POST',
        url : '/HTML/Login', // 요청이 전송되는 url이 포함된 문자열
        data: {userid : id, password : pw},
        success : function(data) {
            if (data === 'success') {
                alert('로그인 성공');
                window.location.href = "http://localhost:2019/HTML/Board_List.html";
            } else {
                alert('로그인 실패');
                window.location.href="http://localhost:2019/HTML/Login.html";
            }
        },
        error : function(err){
            console.error(err);
        }
        });
});
$('#reset').click(function(){
    window.href = "http://localhost:2019/HTML/Login.html";
});