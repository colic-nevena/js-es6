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

    DrawService.crtajFormu();
    const divz = document.getElementById("inputi");

    let btnProsledi = document.createElement("button");
    btnProsledi.innerHTML = "Prosledi";
    btnProsledi.className = "btn btn-secondary";
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


        KursService.getByName(selValueKurs)
            .then(kurs => {
                const kursic = kurs[0];

                if (!kursic.zabrana_rez) {
                    kursic.mesta_na_kursu -= 1;
                    if (kursic.mesta_na_kursu === 0)
                        kursic.zabrana_rez = true;

                    const novi = {

                        "id": kursic.id,
                        "ime": kursic.ime,
                        "rating": kursic.rating,
                        "mesta_na_kursu": kursic.mesta_na_kursu,
                        "science": kursic.science,
                        "zabrana_rez": kursic.zabrana_rez,
                        "dani": kursic.dani,
                        "sati": kursic.sati
                    };

                    dodajPrijavu(novi, novi.id, ime, prezime);

                } else {
                    div.innerHTML = `<strong>Nažalost na ovom kursu nema dovoljno mesta.</strong>`;

                }

            })
    }
};





function dodajPrijavu(data, id, ime, prezime) {

    fetch(`http://localhost:3000/kursevi/${id}`, {
        method: 'put',
        headers: {
            'Accept': 'application/json,text/plain',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    }).then(res => res.json());



    PrijavljeniService.get()
        .then(niz => niz.length)
        .then(duz => {
            fetch('http://localhost:3000/prijavljeni/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json,text/plain',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: `${duz+1}`, ime: `${ime}`, prezime: `${prezime}`, kurs: `${data.ime}` })
            }).then(res => res.json());
        });


    let divv = document.getElementById("ispis");
    divv.innerHTML = `<strong>${ime} ${prezime}, uspešno Ste se prijavili za kurs ${data.ime}!<br/>Za novu prijavu, molim osvežite stranicu.</strong>`;


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
    divv.innerHTML = `<strong>Japanski jezik nije standardni kurs naše škole.<br/>Vaša rezervacija je 
    zapamćena u našoj bazi i profesor Vam je sada na raspolaganju u datim terminima. <hr/>Molim osvežite stranicu.</strong>`;

    dodajKurs();

    const btDel = document.getElementById("btnObrisiJap");
    btDel.style.visibility = "visible";

}

const btnDelete = document.getElementById("btnObrisiJap");
btnDelete.onclick = function() {

    let dd = document.getElementById("ispis");
    dd.innerHTML = `<strong>Specijalna rezervacija Japanskog jezika uspešno otkazana.</strong>`;

    fetch('http://localhost:3000/kursevi/10?force=true', {
        method: 'DELETE'
    }).then(res => res.json());

    const btDel = document.getElementById("btnObrisiJap");
    btDel.style.visibility = "hidden";

}