export class PrijavljeniService {

    static get() {
        return fetch("http://localhost:3000/prijavljeni/")
            .then(response => response.json());

    }
}