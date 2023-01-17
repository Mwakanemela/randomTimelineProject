const timelineIndicator = document.querySelector('.timelineIndicator');
const eventInfo = document.querySelector('.eventInfo');
const orderListEvents = eventInfo.querySelector('ol');
const orderListInd = timelineIndicator.querySelector('ol');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let move = 200;

const page = {indicators:[], info:[], pos:0};

const myData = [];

generateEvent();

outputTimeLine();

next.addEventListener('click', (e)=> {
    let box = orderListInd.getBoundingClientRect();
    console.log(myData.length * move * -1);
    console.log(box.left - box.width);
    page.pos -= move;
    if((box.left - box.width) < (myData.length * move * -1) + move * 2) {
        page.pos = (myData.length * move * -1) + (move*3);
    }
    
    setValue(orderListInd, 'translateX', page.pos + 'px');
});

prev.addEventListener('click', (e)=> {
    let box = orderListInd.getBoundingClientRect();
    console.log(myData.length * move);
    console.log(box);
    page.pos += move;

    if(box.left > move) {
        page.pos = move;
    }
    setValue(orderListInd, 'translateX', page.pos + 'px');
});

function setValue(ele, prop, val) {
    ele.style["transform"] = prop + "(" + val + ")";
}
function showEvent(val) {
    ////console.log(val);
    //console.log(page);
    page.indicators.forEach((el, index)=>{
        if(index <= (val + 1)) {
            el.classList.add('done');
        }else {
            el.classList.remove('done');
        }

        if(index == val) {
            el.classList.add('active');

        }else {
            el.classList.remove('active');
        }
    })

    page.info.forEach((el, index)=>{
        //console.log(el);
        if(index == val) {
            el.style.opacity = 1;
        }
        else {
            el.style.opacity = 0; 
        }
    })
}
function outputTimeLine() {
    sortData(myData, 'val');
    myData.forEach((el, index) => {
        const li1 = document.createElement('li');
        let tempDate = new Date(el.val);
        let tempHolder = tempDate.toDateString().split(' ');
        
        li1.style.left = move * index + 'px';

        li1.textContent = tempHolder.slice(1, 3).join('--');
        li1.addEventListener('click', (e)=> {
            showEvent(index);
        });
        orderListInd.append(li1);
        const li = document.createElement('li');
        orderListEvents.append(li);
        li.style.opacity = 0;
        const div1 = document.createElement('div');
        div1.textContent = el.title.toUpperCase();
        div1.style.fontSize = '1.5em';
        div1.style.padding = '10px';
        li.append(div1);

        const div3 = document.createElement('div');
        
        //div3.textContent = tempDate.toISOString().substr(0, 10);
        div3.textContent = tempDate.toDateString();
        div3.style.fontSize = '1.1em';
        div3.style.padding = '10px';
        div3.style.backgroundColor = 'black';
        div3.style.color = 'white';
        li.append(div3);

        const div2 = document.createElement('div');
        div2.innerHTML ='<img src="images/me.jpg" />';
        div2.innerHTML +=  el.content;
        div2.style.padding = '10px';

        li.append(div2); 

        
        
        const hr = document.createElement('hr');
        li.append(hr);

        page.indicators.push(li1);
        page.info.push(li);
        showEvent(0);
    })
}

function sortData(obj, prop) {
    //console.log(obj);
    obj.sort((a, b) => {
        //console.log(a[prop], b[prop]);

        if(a[prop] < b[prop]) {
            return -1;
        }

        if(a[prop] > b[prop]) {
            return 1;
        }

        return 0;
    }) 
}
function generateEvent() {

    function ranDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    for(let x = 0; x<5; x++) {
        let description = '';
        let ran = Math.floor(Math.random() * 2 ) + 2;
        for( let i = 0; i < 3; i++) {
            description += (getParagraphs()) + '\n'; 
        }
       // //console.log(description);
        let randomDate = ranDate(new Date(2023, 0, 1), new Date(2024, 0, 1));
        let tempObj = {
        val:randomDate.getTime(),
        title:generateWords(3),
        content:description
      }
      myData.push(tempObj);
    }
    ////console.log(myData);
    
    
}

function getParagraphs() {
    let temp = '';
    let ran = Math.floor(Math.random() * 10) + 3;
    for(let i = 0; i < ran; i++) {
        let ran2 = Math.floor(Math.random() * 10);
        temp += generateWords(ran2).trim() + '. ';
    }

    return (temp);
}
function generateWords(val) {
    const randomCharacters = 'abcdefghijklmnopqrstuvwxyzaaaaaabbbbccceeeeeeiiiiiiioooottttmmmmmwwwwwwaaaakkkkaaaawbfdbkvdb';
    let position = Math.floor(Math.random() * randomCharacters.length);
    let result  = randomCharacters.charAt(position).toUpperCase();
    
    const letters = Math.floor(Math.random() * 10) + 2;
    
    while(val > 0) {
        for(let x = 0; x < letters; x++) {
            let position = Math.floor(Math.random() * randomCharacters.length);
            result += randomCharacters.charAt(position);

        }
        val--;
        result += ' ';
    }
    return (result);
}