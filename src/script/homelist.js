let ajax = new XMLHttpRequest();
ajax.open('get', 'http://localhost/dashboard/rollskin/php/taobao.php', true);
ajax.send();
ajax.onreadystatechange = function() {
    if (ajax.readyState === 4) {
        // console.log(JSON.parse(ajax.responseText));
        // console.log(ajax.responseText);
        let tabaodata = JSON.parse(ajax.responseText);
        let taobaohtml = '';
        let xUl = document.querySelector('.taobao ul');


        for (let value of tabaodata) { //数组的值
            taobaohtml += `
                    <li>
                        <img src="${value.url}"/>
                        <p>${value.title}</p>
                        <span>￥${value.price}</span>
                    </li>
                `;
        }
        xUl.innerHTML = taobaohtml;
    }
}