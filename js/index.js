const title = document.querySelector('.title');
const inputAccepted = document.getElementById('accepted');
const inputKnot = document.getElementById('shipped');
const inputCount = document.getElementById('BU');
const btn = document.getElementById('btn');


let data = [];

let id = 0;

btn.onclick = () => {
    data = JSON.parse(localStorage.getItem('data'));
    
    if(data === null){
        data = [];
    }
    while(true) {
        id = localStorage.getItem('key');
        if(id === null){
            id = 0;
        }
        let obj = {};
        obj.accepted = Number(inputAccepted.value);
        obj.shipped = Number(inputKnot.value);
        obj.Bu = Number(inputCount.value);

        for(let i = 0; i < data.length; i++){
            obj.accepted = Number(obj.accepted) + Number(data[i].accepted);
            obj.shipped = Number(obj.shipped) + Number(data[i].shipped);
            obj.Bu = Number(obj.Bu) + Number(data[i].Bu);
            data.splice(i, 1);
            id -= 1;
            
        }

        console.log(obj);
        data[id] = obj;

        localStorage.setItem('data', JSON.stringify(data));
        id++;
        localStorage.setItem('key', id);
        break;
    }

}

const table = document.createElement('table');
const lookBtn = document.getElementById('lookBtn');
const elemButtons = document.querySelector('.table-button');

lookBtn.onclick = () => {

    const res = JSON.parse(localStorage.getItem('data'));
    lookBtn.disabled = true;
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.classList.add('table');

    table.appendChild(thead);
    table.appendChild(tbody);

    elemButtons.before(table);
    const row_1 = document.createElement('tr');
    const headerEngine = document.createElement('th');
    headerEngine.innerHTML = 'Принято';

    const headerKnot = document.createElement('th');
    headerKnot.innerHTML = 'Отгружено';

    const headerCount = document.createElement('th');
    headerCount.innerHTML = 'БУ';

    row_1.appendChild(headerEngine);
    row_1.appendChild(headerKnot);
    row_1.appendChild(headerCount);

    table.appendChild(row_1);
    
    if(res !== null){
        console.log(res);
        let id = 0;
        for (let i = 0; i < res.length; i++) {
            const row_2 = document.createElement('tr');
            const bodyEngine = document.createElement('td');
            bodyEngine.innerHTML = `${res[i].accepted}`;

            const bodyKnot = document.createElement('td');
            bodyKnot.innerHTML = `${res[i].shipped}`;

            const bodyCount = document.createElement('td');
            bodyCount.innerHTML = `${res[i].Bu}`;

            row_2.appendChild(bodyEngine);
            row_2.appendChild(bodyKnot);
            row_2.appendChild(bodyCount);

            table.appendChild(row_2);  
        }
    }else{
        const elemMessage = document.createElement('div');
        elemMessage.innerHTML = 'Таблица пока пустая!';
        elemMessage.style.marginBottom = '20px';
        elemButtons.before(elemMessage);
    }
}

const clearBtn = document.getElementById('clearBtn');
clearBtn.onclick = () => {

    if(confirm('Вы действительно хотите очистить таблицу?')){
        localStorage.clear();
        table.remove();
        alert('Таблица успешно очищена!');
    } else {
        alert('Фуух, данные спасены...');
    }

}
