import { Nastavnik } from './nastavnik';
import { Kurs } from './kurs';
import { RandomService } from './random.service';
import { NastavnikService } from './nastavnik.service';
import { KursService } from './kursevi.service';
import { DrawService } from './draw.service';



function nadji(dan, vreme) {


    const niz = KursService.get()
        .then(niz => niz.forEach(kurs => {
            let tmp1 = kurs.dani.find(d => d === dan);
            let tmp2 = kurs.sati.find(s => s === vreme);
            if (tmp1 !== undefined && tmp2 !== undefined)
                DrawService.ShowCourse(kurs);
        }));


}

function upisi(ime) {

    const div = document.getElementById("ispis");
    /*$.getJSON("jsonFile.json", function(data) {
    var items = [];    
    $.each( data, function( key, val ) {
        items.push(key + " " + val);
    });
});*/


    const niz = KursService.get()
        .then(niz => niz.forEach(kurs => {
            if (kurs.ime === ime) {
                if (!kurs.zabrana_rez) {

                    var cnt = kurs.mesta_na_kursu - 1;
                    var m = 'mesta_na_kursu';
                    var z = 'zabrana_rez';
                    kurs[m] = cnt;

                    console.log("\nKURS: " + JSON.stringify(kurs));
                    if (cnt === 0)
                        kurs[z] = 'true';

                    div.innerHTML = `Uspešno Ste se upisali na kurs: ${kurs.ime}<br/>Srećno učenje!<br/>Preostalo mesta: ${cnt}`;
                } else {
                    div.innerHTML = "Nažalost na ovom kursu nema više slobodnih mesta.";
                    console.log("\nKURS: " + JSON.stringify(kurs));
                }
            }


        }));


}



const btn = document.getElementById("btn");

btn.onclick = function() {

    const div = document.getElementById("available");
    div.innerHTML = " ";

    const sel = document.querySelector(".selDan");
    const selValueDan = sel.options[sel.selectedIndex].value;
    const sell = document.querySelector(".selVreme");
    const selValueVreme = sell.options[sell.selectedIndex].value;
    nadji(selValueDan, selValueVreme);

};






const btnUpis = document.getElementById("btnUpis");

btnUpis.onclick = function() {

    const div = document.getElementById("ispis");
    div.innerHTML = " ";

    const selk = document.querySelector(".selKurs");
    const selValueKurs = selk.options[selk.selectedIndex].value;

    console.log("Izabran kurs je: " + selValueKurs);
    upisi(selValueKurs);


};

function dodajKurs() {

    fetch('http://localhost:3000/kursevi', {
        method: 'post',
        headers: {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 10, ime: 'Japanski', rating: 5, mesta_na_kursu: 15, science: false, zabrana_rez: false, dani: ['pon', 'sre', 'pet'], sati: ['10', '12', '13', '17'] })
    }).then(res => res.json());


}

var bt = document.getElementById("btnDodajKurs");

bt.onclick = function() {

    let divv = document.getElementById("ispis");
    divv.innerHTML = `Japanski jezik nije standardni kurs naše škole.<br/>Vaša rezervacija je 
    zapamćena u našoj bazi i profesor Vam je sada na raspolaganju u datim terminima. <hr/>Molim osvežite stranicu.`;

    dodajKurs();

}



/*const url = "http://localhost:3000/kursevi";
const kursObservable = Rx.Observable.fromPromise(
    fetch(url)
    .then(response => response.json()));
*/


/*Rx.Observable.fromEvent(select, "onchange")
    .debounceTime(1000)
    .map(ev => ev.target.value)
    .filter(dan => nadji(dan))
    .switchMap(sel => kursObservable)
    .subscribe(kurs => div.innerHTML = kurs.ime);*/