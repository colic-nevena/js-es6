import { Nastavnik } from './nastavnik';
import { Kurs } from './kurs';
import { RandomService } from './random.service';
import { NastavnikService } from './nastavnik.service';
import { KursService } from './kursevi.service';

const randserv = new RandomService();

//rating skole
Promise.all([
        KursService.get(), NastavnikService.get()
    ])
    .then(([kursevi, nastavnici]) => {

        var k = kursevi.reduce((acc, curr) => acc + curr.rating, 0);
        var n = nastavnici.reduce((acc, curr) => acc + curr.rating, 0);

        var r = Math.round(((k + n) / 2), 2);

        ShowSchoolRating(r);
    });


//rating svih nastavnika ukupno
const teachs = NastavnikService.get()
    .then(teachs => {
        var r = Math.round(teachs.reduce((acc, curr) => acc + curr.rating, 0), 2);
        ShowTeacherRating(r);
    });


var teachs2 = NastavnikService.get()
    .then(teachs2 => teachs2.forEach(teach => showTeacher(teach)));




//nastavnik dana
Promise.all([
        randserv.getRandomNumb(), NastavnikService.get()
    ])
    .then(([num, arr_nast]) => {
        showTeacherDay(arr_nast[num % arr_nast.length]);
    });








//fje za crtanje
function ShowSchoolRating(rating) {

    const x = document.getElementById("rat");
    const el = document.createElement("p");
    el.className = "rejting";
    el.innerHTML = `<h3>Bodova za kvalitet: ${rating} od mogucih 35</h3>`;
    x.appendChild(el);

}

function ShowTeacherRating(rating) {

    const x = document.getElementById("ratNast");
    const el = document.createElement("p");
    el.className = "rejting";
    el.innerHTML = `<h3>Bodova za kvalitet: ${rating} od mogucih 25</h3>`;
    x.appendChild(el);

}

function showTeacher(teacher) {
    const par = document.getElementById("nastavnici");

    const el = document.createElement("div");
    el.className = "nastavnik";
    const { licno_ime, rating } = teacher;
    el.innerHTML = `<h3>${teacher.licno_ime}</h3> <br/>Ocena: ${teacher.rating}`;

    par.appendChild(el);
}

function showTeacherDay(teach) {
    const parent = document.getElementById("day");

    const elem = document.createElement("div");
    elem.className = "nastavnikDana";
    const { licno_ime, rating, kursevi } = teach;
    elem.innerHTML = `<h3>${teach.licno_ime}</h3> <br/>Ocena: ${teach.rating}<br/><br/> ${teach.kursevi}`;

    parent.appendChild(elem);
}