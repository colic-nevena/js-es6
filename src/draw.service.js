import { Nastavnik } from './nastavnik';
import { Kurs } from './kurs';
import { RandomService } from './random.service';
import { NastavnikService } from './nastavnik.service';
import { KursService } from './kursevi.service';
import * as Rx from 'rxjs';



export class DrawService {

    static ShowSchoolRating(rating) {

        const x = document.getElementById("rat");
        const el = document.createElement("p");
        el.className = "rejting";
        el.innerHTML = `<h3>Rating: ${rating}</h3>`;
        x.appendChild(el);

    }

    static ShowTeacherRating(rating) {

        const x = document.getElementById("ratNast");
        const el = document.createElement("p");
        el.className = "rejting";
        el.innerHTML = `<h3>Rating: ${rating}</h3>`;
        x.appendChild(el);

    }




    static showTeacher(teacher) {

        const par = document.getElementById("nastavnici");

        const el = document.createElement("div");
        el.className = "nastavnik";
        const { licno_ime, rating } = teacher;
        el.innerHTML = `<h3>${teacher.licno_ime}</h3> <br/>Ocena: ${teacher.rating}`;
        par.appendChild(el);


        const par2 = document.getElementById("btns");
        const button = document.createElement("button");
        button.innerHTML = "reward teacher";
        button.className = "rwdbtn";
        button.dataset.bid = teacher.id;

        const glasDiv = document.getElementById("glasanje");
        ////////////////////////////
        Rx.Observable.fromEvent(button, "click")
            .scan(rejt => rejt + 0.01, teacher.rating)
            .subscribe(rejt => glasDiv.innerHTML = `Hvala za glas!<br/>Podigli ste rejting profesora: ${teacher.licno_ime} <br/>na ${rejt.toFixed(2)}`)


        par2.appendChild(button);

    };



    static showTeacherDay(teach) {
        const parent = document.getElementById("day");

        const elem = document.createElement("div");
        elem.className = "nastavnikDana";
        const { licno_ime, rating, kursevi } = teach;
        elem.innerHTML = `<h3>${teach.licno_ime}</h3> <br/>Ocena: ${teach.rating}<br/><br/> ${teach.kursevi}`;

        parent.appendChild(elem);
    }



    static ShowScience(course) {

        const p = document.getElementById("levi");

        const ell = document.createElement("div");
        ell.className = "kurs";
        ell.style.backgroundColor = "#89DA59";
        const { ime, rating } = course;
        ell.innerHTML = `<h3>${course.ime}</h3> <br/>Ocena: ${course.rating}`;
        p.appendChild(ell);
    }


    static ShowLang(course) {

        const p = document.getElementById("desni");

        const ell = document.createElement("div");
        ell.className = "kurs";
        ell.style.backgroundColor = "#F99866";

        const { ime, rating } = course;
        ell.innerHTML = `<h3>${course.ime}</h3> <br/>Ocena: ${course.rating}`;
        p.appendChild(ell);
    }

    static ShowScienceRating(rating) {

        const x = document.getElementById("ratSc");
        const el = document.createElement("p");
        el.className = "rejting";
        el.innerHTML = `<h3>Rating: ${rating}</h3>`;
        x.appendChild(el);

    }

    static ShowLangRating(rating) {

        const x1 = document.getElementById("ratLang");
        const el1 = document.createElement("p");
        el1.className = "rejting";
        el1.innerHTML = `<h3>Rating: ${rating}</h3>`;
        x1.appendChild(el1);

    }



    static ShowCourse(course) {

        const p = document.getElementById("available");

        const ell = document.createElement("div");
        ell.className = "kurs";
        ell.style.backgroundColor = "#80BD9E";
        const { ime } = course;
        ell.innerHTML = `<h2>${course.ime}</h2>`;
        p.appendChild(ell);



    }













}