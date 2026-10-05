import { Router } from './router';


function main(){

    const router = new Router();

    router.get('/users', () => {
        console.log('GET /users route handler');
    });

    router.post('/users', () => {
        console.log('POST /users route handler');
    });

    console.log(router);
}

main();