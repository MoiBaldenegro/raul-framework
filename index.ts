import { NodeServerAdapter } from './NodeServerAdapter.js';
import { Router } from './Router.js';
import { HttpServerAdapter } from './types/HttpServerAdapter.js';


function main(httpServerAdapter: HttpServerAdapter | null = null) {

    if (!httpServerAdapter) throw new Error('HttpServerAdapter is required');

    httpServerAdapter.listen(3000, () => {
        console.log('Server is running on port 3000');
    });


    const router = new Router();

    router.get('/users', () => {
        console.log('GET /users route handler');
    });

    router.post('/users', () => {
        console.log('POST /users route handler');
    });

    console.log(router);

   
}

const httpServerAdapter = new NodeServerAdapter();

main(httpServerAdapter);
