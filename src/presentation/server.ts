
import express, { Router } from 'express';
import path from 'path';

interface Options{
    port: number;
    public_path?: string;
    routes: Router
}

export class Server{

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(private options: Options){
        const {port,public_path='public'} = options;
        this.port = port;
        this.publicPath = public_path;
        this.routes = options.routes;
        
    }

    async start(){
        //*Middleware
        this.app.use(express.json()); //raw json
        this.app.use(express.urlencoded({extended: true})); //form data
        //*Public Folder
        this.app.use(express.static(this.publicPath));
        //*Routes
        this.app.use(this.routes);
        //*SPA
        this.app.get('*', (req, res) => {
            const indexPath= path.join(__dirname +`../../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return;

        });

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    };
}