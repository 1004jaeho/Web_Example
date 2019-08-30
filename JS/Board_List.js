/* 로그아웃 */
$('#logout').click(() => {
    alert('로그아웃하겠습니다.');
    window.location.href="http://localhost:2019/Main.html";
});
let a=0;
let b = 5;
let i;
let totalCount;     //  전페 게시글수
let aa;
let bb;
let idx, title, text, wrtier;
/* 데이터 목록 */
$().ready(() => {
    console.log(`11.${a}`)
        $.ajax({
        type : 'GET',
        url : '/HTML/Board_List', 
        data: {a : a, b : b},
        dataType : "json",
        success : function(res) {
            console.log(a);
            const res1 = JSON.stringify(res);``
            console.log(`res : ${res1} a : ${a}, b : ${b}`);
            
            $(res).each(function(key, value){
                title = (this.title);
                writer = (this.writer);
                text =(this.text);
                idx = (this.idx);
                str = '<tr class="OMG"><td>' + idx + '</td>';
                str += '<td>' + title + '</td>';
                str += '<td>' + text + '</td>';
                str += '<td>' + writer + '</td>';
                $('table').append(str); 
            });
            /*페이지 분할 */
            let countList = 5;          //  페이지마다 나타나는 게시글
            let countPage = 5;          //  페이지가 5장까지만 나옴
            let totalPage = Math.ceil(totalCount / countList); //총 페이지
            
            let first_page = 1;             //  첫번째 페이지
            let last_page = totalPage-1;    //  마지막 페이지
            let next = countPage-1;         //다음 화면 페이지 1~9, 10부터 19까지
            let prev = first_page;          //이전 화면 펭지ㅣ 10~19 였다면 1~9까지
            // console.log(idx, last_page, totalPage);
            if(totalCount % countList > 0){
                totalPage++;        //  게시글수와 페이지나타내는 수랑 비교해서 나머지가 있으면 페이지 추가
            }
            let html = "";
            
            if(prev > 0){
                html += " < ";
            }
            for(i=first_page; i <= totalPage; i++){
                html += "<h class='paging"+"'>"  + " [ " + i + " ] "+ "</h> ";
            }
            
            if(last_page <= totalPage) {
                html += " > </table>"; 
            }
            console.log(html);
            $("#paging").html(html);    // 페이지 목록 생성
        }
    });
});
/* ajax로 게시글 몇개인지 받아오기 */
$.ajax({
    type : 'GET',
    url : '/HTML/Page', 
    dataType : "json",
    async : false,
    success : function(res) {
        const res1 = JSON.stringify(res);
        totalCount = res[0].idx
        
    },
});

/* 데이터 보기 클릭이벤트로 돌아감 */
$('#List').on('click', '.Paging', (e) => {
    
    console.log(e);
    console.log(e.currentTarget.children[0].innerText);
    idx = e.currentTarget.children[0].innerText; 
    title = e.currentTarget.children[1].innerText;
    text = e.currentTarget.children[2].innerText;
    writer = e.currentTarget.children[3].innerText;
    $.ajax({
        type : 'GET',
        url : '/HTML/Update',
        dataType : "json",
        data: {idx : e.currentTarget.children[0].innerText, 
            title : e.currentTarget.children[1].innerText,
            text : e.currentTarget.children[2].innerText,
            writer : e.currentTarget.children[3].innerText,
        },
        success : function(res) {
            const res1 = JSON.stringify(res);
            $(res).each(function() {
                console.log(`dsadad : ${idx}`);
                title = (this.title);
                writer = (this.writer);
                text =(this.text);
                idx = (this.idx);
                str = '<tr class="Update"><td>' + idx + '</td>';
                str += '<td>' + title + '</td>';
                str += '<td>' + text + '</td>';
                str += '<td>' + writer + '</td>';
                
                $('table').append(str); 
            });
            window.location.href=`http://localhost:2019/HTML/Update.html?$idx=${idx}`;
        },
    });

})
console.log(idx);

/* 페이지 넘어갈때마다 클릭 이벤트 들어감 */
let page;   /* 현재 페이지를 나타냄 */
$('#paging').on('click', '.paging', (e) => {
    console.log(e);
    /* 현재 페이지 나타남 */
    console.log(e.currentTarget.innerText);
    page = e.currentTarget.innerText.slice(2,3);
    console.log(page);
    a= (page-1)*5;
    /* 데이터 넘기기 */
    $.ajax({
        type : 'GET',
        url : '/HTML/Board_List',
        dataType : "json",
        data: {a, b, page: page.slice(2,3)},
        success : function(res) {
            /* 여기서 5개씩 끊기 */
            const res1 = JSON.stringify(res);
            $('tr').remove(".OMG");
            $().replaceAll(".Paging"); 
            $(res).each(function() {
                title = (this.title);
                writer = (this.writer);
                text =(this.text);
                idx = (this.idx);
                str = '<tr class="Paging"><td><button type="button" class="Update">' + idx + '</td></button>';
                str += '<td>' + title + '</td>';
                str += '<td>' + text + '</td>';
                str += '<td>' + writer + '</td>';
                
                $('table').append(str); 
            });
            console.log(res1);
            
        },
        error : function(err){
            console.log(err);
        },
    });
});

// $('#Update').click(()=>{
//     window.location.href="http://localhost:2019/HTML/Update.html";
// })

