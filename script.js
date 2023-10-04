async function start() {
    event.preventDefault();
    let myinput = document.getElementById('myInput').value;
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${myinput}`);
    if (data.status == 404) {
        document.getElementById('h31').innerHTML = "Couldn't find such word 🤔 !";
        document.getElementById('example').style.display="none";
        document.getElementById('soundicon').style.display="none";
        document.getElementById('h41').innerHTML = "";
        document.getElementById('h42').innerHTML = "";
        document.getElementById('h32').innerHTML = "";
    }
    let result = await data.json();
    let outword = result[0].word;
    function toTitlecase() {
        let displayword = outword.charAt(0).toUpperCase() + outword.substr(1).toLowerCase();
        document.getElementById('h31').innerHTML = displayword;
        document.getElementById('soundicon').style.display="block";
    }
    toTitlecase();
    document.getElementById('h41').innerHTML = result[0].meanings[0].partOfSpeech;
    let slength = result[0].phonetics.length;
    for (let i = 0; i < slength; i++) {
        if (result[0].phonetics[i].text !== undefined) {
            document.getElementById('h42').innerHTML = result[0].phonetics[i].text;
        }
    }
    document.getElementById('h32').innerHTML = result[0].meanings[0].definitions[0].definition;

    let meanlength = result[0].meanings.length;
    for (let j = 0; j < meanlength; j++) {
        if (result[0].meanings[j].definitions[0].example) {
            document.getElementById('example').innerHTML = result[0].meanings[j].definitions[0].example;
            document.getElementById('example').style.display="block";
            break;
        }
        else{
            document.getElementById('example').style.display="block";
            document.getElementById('example').innerHTML = "Sorry ! , No example found.";
        }
    }
    
    
}

async function playsound() {
    event.preventDefault();
    let myinput = document.getElementById('myInput').value;
    let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${myinput}`);
    let result = await data.json();
    let slength = result[0].phonetics.length;
    let count = 0;
    for (let i = 0; i < slength; i++) {
        if (result[0].phonetics[i].audio) {
            let audio = new Audio(result[0].phonetics[i].audio);
            audio.play();
            count++;
            break;
        }
    }
    if (count == 0) {
        alert('No valid audio found, please try another word.');
    }
}