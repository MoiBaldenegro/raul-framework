import { RaulServerFactory } from "./RaulServerFactory.js";


function main() {

    const app = RaulServerFactory.create();

    app.get('/users', (req: Request) => {
        return Response.json({ message: 'GET /users route handler' });
    });

    app.post('/users', (req: Request) => {
        return Response.json({ message: 'POST /users route handler' });
        
    });

    app.listen(3002, () => {
        console.log('Server is running on port 3002');
    });

}


main();
