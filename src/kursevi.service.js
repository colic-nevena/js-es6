export class KursService {

    static get() {
        return fetch("http://localhost:3000/kursevi/")
            .then(response => response.json());

    }
}