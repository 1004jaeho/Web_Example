$('table').on('click', '.Paging', (e) => {
    window.location.href="http://localhost:2019/HTML/Update.html";
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
            console.log(res1);
            
        },
    });
})