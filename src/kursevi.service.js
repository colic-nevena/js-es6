export class KursService {

    static get() {
        return fetch("http://localhost:3000/kursevi/")
            .then(response => response.json());

    };

    static getByName(nm) {
        return fetch(`http://localhost:3000/kursevi/?ime=${nm}`)
            .then(response => response.json());

    };

  

}