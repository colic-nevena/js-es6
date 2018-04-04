import * as Rxjs from 'rxjs';
import { interval } from 'rxjs/Observable/interval';

const main = document.getElementById("main");

const p = document.createElement('p');
p.innerHTML = "test test test";

main.appendChild(p);