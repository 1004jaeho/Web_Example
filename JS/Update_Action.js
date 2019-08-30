temp=location.href.split("?$idx=");
data=temp[1];
console.log(` data : ${data}`);

let idx=data;
console.log(`idx Update  : ${idx} `);

$('.Update_Action').click(() => {
    const title = $('#Update_title').val();
    const text = $('#Update_text').val();
    const writer = $('#Update_writer').val();
    
    $.ajax({
        url : '/HTML/Update_Action',
        data : {idx, title :title,text: text, writer: writer},
        type : 'POST',
        success : function(res){
            console.log(res);
            if(res==='success'){
            console.log(res);
            alert(res);
            window.location.href="http://localhost:2019/HTML/Board_List.html";
            }
        },
        error : function(err) {
            console.log(err);
        }

    });

});
