import { Nastavnik } from './nastavnik';
import { Kurs } from './kurs';
import { RandomService } from './random.service';
import { NastavnikService } from './nastavnik.service';
import { KursService } from './kursevi.service';
import { DrawService } from './draw.service';
import { PrijavljeniService } from './prijavljeni.service';




function nadji(dan, vreme) {


    const niz = KursService.get()
        .then(niz => niz.forEach(kurs => {
            let tmp1 = kurs.dani.find(d => d === dan);
            let tmp2 = kurs.sati.find(s => s === vreme);
            if (tmp1 !== undefined && tmp2 !== undefined)
                DrawService.ShowCourse(kurs);
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

    const divz = document.getElementById("inputi");

    let lab1 = document.createElement("label");
    lab1.innerHTML = "Ime: ";
    divz.appendChild(lab1);

    let input1 = document.createElement("input");
    input1.type = "text";
    input1.className = "inp1";
    lab1.appendChild(input1);
    divz.appendChild(document.createElement("br"));
    divz.appendChild(document.createElement("br"));

    let lab2 = document.createElement("label");
    lab2.innerHTML = "Prezime: ";
    divz.appendChild(lab2);

    let input2 = document.createElement("input");
    input2.type = "text";
    input2.className = "inp2";
    lab2.appendChild(input2);
    divz.appendChild(document.createElement("br"));
    divz.appendChild(document.createElement("br"));

    let btnProsledi = document.createElement("button");
    btnProsledi.innerHTML = "Prosledi";
    divz.appendChild(btnProsledi);

    btnProsledi.onclick = function() {
        const div = document.getElementById("ispis");
        div.innerHTML = " ";


        const selk = document.querySelector(".selKurs");
        const selValueKurs = selk.options[selk.selectedIndex].value;

        const inp1 = document.querySelector(".inp1");
        const ime1 = inp1.value;
        const ime = ime1.charAt(0).toUpperCase() + ime1.slice(1);

        const inp2 = document.querySelector(".inp2");
        const prezime1 = inp2.value;
        const prezime = prezime1.charAt(0).toUpperCase() + prezime1.slice(1);


        dodajPrijavu(selValueKurs, ime, prezime);

    }
};





function dodajPrijavu(selValueKurs, ime, prezime) {


    /*KursService.get()
        .then(kursevi => kursevi.filter(kurs => kurs.ime === selValueKurs))
        .then(kurs => {
            fetch(`http://localhost:3000/kursevi/ime=${selValueKurs}`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json,text/plain',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ id: `${kurs.id}`, ime: `${kurs.ime}`, rating: `${kurs.rating}`, mesta_na_kursu: `${kurs.mesta_na_kursu-1}`, science: `${kurs.science}`, zabrana_rez: `${kurs.zabrana_rez}`, dani: `${kurs.dani}`, sati: `${kurs.sati}` })
            }).then(res => res.json());
        });*/


    PrijavljeniService.get()
        .then(niz => niz.length)
        .then(duz => {
            fetch('http://localhost:3000/prijavljeni/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json,text/plain',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: `${duz+1}`, ime: `${ime}`, prezime: `${prezime}`, kurs: `${selValueKurs}` })
            }).then(res => res.json());
        });


    let divv = document.getElementById("ispis");
    divv.innerHTML = `<em>${ime} ${prezime}, uspešno Ste se prijavili za kurs ${selValueKurs}!<br/>Za novu prijavu, molim osvežite stranicu.</em>`;


}




function dodajKurs() {

    return fetch('http://localhost:3000/kursevi', {
        method: 'post',
        headers: {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: 10, ime: 'Japanski', rating: 5.0, mesta_na_kursu: 15, science: false, zabrana_rez: false, dani: ['pon', 'sre', 'pet'], sati: ['10', '12', '13', '17'] })
    }).then(res => res.json());



}

var bt = document.getElementById("btnDodajKurs");

bt.onclick = function() {

    let divv = document.getElementById("ispis");
    divv.innerHTML = `Japanski jezik nije standardni kurs naše škole.<br/>Vaša rezervacija je 
    zapamćena u našoj bazi i profesor Vam je sada na raspolaganju u datim terminima. <hr/>Molim osvežite stranicu.`;

    dodajKurs();

    const btDel = document.getElementById("btnObrisiJap");
    btDel.style.visibility = "visible";

}

const btnDelete = document.getElementById("btnObrisiJap");
btnDelete.onclick = function() {

    let dd = document.getElementById("ispis");
    dd.innerHTML = "Specijalna rezervacija Japanskog jezika uspešno otkazana.";

    return fetch('http://localhost:3000/kursevi/10?force=true', {
        method: 'DELETE'
    }).then(res => res.json());


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