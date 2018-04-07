import { Nastavnik } from './nastavnik';
import { Kurs } from './kurs';
import { RandomService } from './random.service';
import { NastavnikService } from './nastavnik.service';
import { KursService } from './kursevi.service';
import * as Rx from 'rxjs';
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

const btn = document.getElementById("btn");

btn.onclick = function() {

    const sel = document.querySelector(".selDan");
    const selValueDan = sel.options[sel.selectedIndex].value;
    const sell = document.querySelector(".selVreme");
    const selValueVreme = sell.options[sell.selectedIndex].value;
    nadji(selValueDan, selValueVreme);

};


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