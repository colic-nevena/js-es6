export class RandomService {

    getRandomNumb() {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(parseInt(Math.random() * 10), 2000));
        });
    }


}