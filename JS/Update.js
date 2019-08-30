console.log('update.js')
temp=location.href.split("?$idx=");
data=temp[1];
console.log(` data : ${data}`);

let idx=data;

console.log('1');
$().ready(() => {
    console.log('2');
    $.ajax({
        url : '/HTML/Update',
        type : 'GET',
        data : {idx},
        dataType : "json",
        success : function(res) {
            const res1 = JSON.stringify(res);
            console.log(res1);
            $(res).each(function() {
                
                console.log(`dsadad : ${idx}`);
                title = (this.title);
                writer = (this.writer);
                text =(this.text);
                idx = (this.idx);
                str = '<tr><td>' + idx + '</td>';
                str += '<td>' + title + '</td>';
                str += '<td>' + text + '</td>';
                str += '<td>' + writer + '</td>';
                $('table').append(str); 
            });
        },
        error : function(err) {
            console.log(err);
        }
    });
});

/*  수정클릭 */
$('#Update').click(()=>{
    window.location.href=`http://localhost:2019/HTML/Update_Action.html?$idx=${idx}`;
    console.log(`idx : ${idx}`);
    $.ajax({
        url : '/HTML/Update_Action',
        data : {idx},
        dataType :'json',
        type : 'GET',
        success : function(res){
            alert('수정 되었습니다.');
            
        },
        error : function(err) {
            console.log(err);
        }

    });

});


/*  삭제클릭 */
$('#Delete').click(()=>{
    
    $.ajax({
        url : '/HTML/Delete',
        data : {idx},
        dataType :'json',
        type : 'GET',
        success : function(res){
            alert('삭제 되었습니다.');
            window.location.href="http://localhost:2019/HTML/Board_List.html";
        },
        error : function(err) {

        }

    });
});