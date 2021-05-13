let ajax = new XMLHttpRequest();
ajax.open('get', 'http://10.31.161.106/dashboard/rollskin/php/taobao.php', true);
ajax.send();
ajax.onreadystatechange = function() {
    if (ajax.readyState === 4) {
        let tabaodata = JSON.parse(ajax.responseText);
        let taobaohtml = '';
        let xUl = document.querySelector('.taobao ul');


        for (let value of tabaodata) { 
            taobaohtml += `
                    <li>
                        <img class="lazy" data-original="${value.url}" width="200" height="200"/>
                        <div><span>￥${value.price}</span><del>￥${value.used}</del></span></div>
                        
                        <p>${value.title}</p>
                       
                    </li>
                `;
        }
        xUl.innerHTML = taobaohtml;
    }
}