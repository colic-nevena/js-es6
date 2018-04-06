import { Nastavnik } from './nastavnik';
import { Kurs } from './kurs';
import { RandomService } from './random.service';
import { NastavnikService } from './nastavnik.service';
import { KursService } from './kursevi.service';
import * as Rx from 'rxjs';




const div = document.querySelector(".available");
const divZak = document.getElementById("zakazivanje");

/*const url = "http://localhost:3000/kursevi";
const kursObservable = Rx.Observable.fromPromise(
    fetch(url)
    .then(response => response.json()));
*/

function nadji(dan) {

    var niz = KursService.get()

    .then(niz.filter(kurs.dani.forEach(item => item === dan)))
        .then(niz => niz.forEach(item => div.innerHTML = item.ime));

}

const btn = document.getElementById("btn");


btn.onclick = function() {
    const sel = document.querySelector(".selDan");
    var selValue = sel.options[sel.selectedIndex].value;

    nadji(selValue);

};




/*Rx.Observable.fromEvent(select, "onchange")
    .debounceTime(1000)
    .map(ev => ev.target.value)
    .filter(dan => nadji(dan))
    .switchMap(sel => kursObservable)
    .subscribe(kurs => div.innerHTML = kurs.ime);*/