import { Router } from "express";
import { TodosController } from "./controller";
import { RequestHandler } from 'express';

export class TodoRoutes{

    static get routes():Router{
        const router = Router();
        const todosController = new TodosController();
        router.get('/', todosController.getTodos);
        router.get('/:id', todosController.getTodoById);
        router.post('/', todosController.createTodo as RequestHandler);
        router.put('/:id', todosController.updateTodo as RequestHandler);
        router.delete('/:id', todosController.deleleTodo);
        return router;
    };
};