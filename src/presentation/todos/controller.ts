
import { Request, Response } from 'express';

const todos = [
    {id: 1, text: 'Buy some milk', completedAt: new Date()},
    {id: 2, text: 'Pick up the kids', completedAt: null},
    {id: 3, text: 'Learn TypeScript', completedAt: new Date()},
];

export class TodosController{
    //*Dependency Injection
    constructor(){};
    public getTodos = (req:Request, res:Response) => {
        res.json(todos);
    };
    public getTodoById = (req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({message: 'Invalid id'});
            return
        }
        const todo = todos.find(todo => todo.id === id);
        if(!todo){
            res.status(404).json({message: 'Todo not found'});
            return;
        }
        res.json(todo);
    }
    public createTodo = (req:Request, res:Response) => {
        const {text}= req.body;
        if (!text){
            res.status(400).json({message: 'Invalid text'});
            return;
        }
        const newTodo = {id: todos.length+1, text, completedAt: new Date()};
        todos.push(newTodo);
        res.status(201).json(newTodo);
        
    }
    public updateTodo= (req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({message: 'Invalid id'});
            return;
        }
        const todo = todos.find(todo => todo.id === id);
        if(!todo){
            res.status(404).json({message: 'Todo not found'});
            return;
        }
        const {text,completedAt}= req.body;

        todo.text = text || todo.text;
        (completedAt === null) 
            ? todo.completedAt = null 
            : todo.completedAt = new Date(completedAt || todo.completedAt);
        res.json(todo);
        return;
    }

    public deleleTodo = (req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({message: 'Invalid id'});
            return;
        }
        const todo = todos.find(todo => todo.id === id);
        if(!todo){
            res.status(404).json({message: 'Todo not found'});
            return;
        }
        todos.splice(todos.indexOf(todo), 1);
        res.json(todo);
    }


}
