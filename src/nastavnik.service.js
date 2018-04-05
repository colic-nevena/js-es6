export class NastavnikService {

    static get() {
        return fetch("http://localhost:3000/nastavnici/")
            .then(response => response.json());

    }
}