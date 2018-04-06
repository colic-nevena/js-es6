import { Nastavnik } from './nastavnik';
import { Kurs } from './kurs';
import { RandomService } from './random.service';
import { NastavnikService } from './nastavnik.service';
import { KursService } from './kursevi.service';
import { DrawService } from './draw.service';

const randserv = new RandomService();



//rating skole
Promise.all([
        KursService.get(), NastavnikService.get()
    ])
    .then(([kursevi, nastavnici]) => {

        var k = kursevi.reduce((acc, curr) => acc + curr.rating, 0);
        var n = nastavnici.reduce((acc, curr) => acc + curr.rating, 0);

        var r = Math.round(((k + n) / 2), 2);

        DrawService.ShowSchoolRating(r);
    });


//rating svih nastavnika ukupno
const teachs = NastavnikService.get()
    .then(teachs => {
        var r = Math.round(teachs.reduce((acc, curr) => acc + curr.rating, 0), 2);
        DrawService.ShowTeacherRating(r);
    });


//crtanje nastavnika i kurseva
var teachs2 = NastavnikService.get()
    .then(teachs2 => teachs2.forEach(teach => DrawService.showTeacher(teach)));

//nastavnik dana
Promise.all([
        randserv.getRandomNumb(), NastavnikService.get()
    ])
    .then(([num, arr_nast]) => {
        DrawService.showTeacherDay(arr_nast[num % arr_nast.length]);
    });




var cs1 = KursService.get()
    .then(cs1 => cs1.filter(kurs => kurs.science))
    .then(cs1 => cs1.forEach(kurs => DrawService.ShowScience(kurs)));

var cs2 = KursService.get()
    .then(cs2 => cs2.filter(kurs => !kurs.science))
    .then(cs2 => cs2.forEach(kurs => DrawService.ShowLang(kurs)));