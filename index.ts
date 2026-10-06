import { RaulServerFactory } from "./RaulServerFactory.js";


function main() {



    const app = RaulServerFactory.create();

    app.get('/users', () => {
        console.log('GET /users route handler');
    });

    app.post('/users', () => {
        console.log('POST /users route handler');
    });


    app.listen(3002, () => {
        console.log('Server is running on port 3002');
    });

}


main();
