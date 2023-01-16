const timelineIndicator = document.querySelector('.timelineIndicator');
const eventInfo = document.querySelector('.eventInfo');
const page = {indicators:[], info:[]};

const myData = [];

generateEvent();

function generateEvent() {

    function ranDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    for(let x = 0; x<10; x++) {
        let description = '';
        let ran = Math.floor(Math.random() * 10 ) + 3;
        for( let i = 0; i < 3; i++) {
            description += (getParagraphs()) + '\n'; 
        }
       // console.log(description);
        let randomDate = ranDate(new Date(2023, 0, 1), new Date(2024, 0, 1));
        let tempObj = {
        val:randomDate.getTime(),
        title:generateWords(5),
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