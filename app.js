const timelineIndicator = document.querySelector('.timelineIndicator');
const eventInfo = document.querySelector('.eventInfo');
const orderListEvents = eventInfo.querySelector('ol');

const page = {indicators:[], info:[]};

const myData = [];

generateEvent();

outputTimeLine();
function outputTimeLine() {
    sortData(myData, 'val');
    myData.forEach((el, index) => {
        const li = document.createElement('li');
        orderListEvents.append(li);
        const div1 = document.createElement('div');
        div1.textContent = el.title.toUpperCase();
        div1.style.fontSize = '1.5em';
        li.append(div1);

        const div2 = document.createElement('div');
        div2.textContent = el.content;
        li.append(div2); 

        const div3 = document.createElement('div');
        let tempDate = new Date(el.val);
        div3.textContent = tempDate.toISOString().substr(0, 10);
        div3.style.fontSize = '1.1em';
        li.append(div3);
        
        const hr = document.createElement('hr');
        li.append(hr);
    })
}

function sortData(obj, prop) {
    console.log(obj);
    obj.sort((a, b) => {
        console.log(a[prop], b[prop]);

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
    for(let x = 0; x<10; x++) {
        let description = '';
        let ran = Math.floor(Math.random() * 2 ) + 2;
        for( let i = 0; i < 3; i++) {
            description += (getParagraphs()) + '\n'; 
        }
       // console.log(description);
        let randomDate = ranDate(new Date(2023, 0, 1), new Date(2024, 0, 1));
        let tempObj = {
        val:randomDate.getTime(),
        title:generateWords(3),
        content:description
      }
      myData.push(tempObj);
    }
    console.log(myData);
    
    
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