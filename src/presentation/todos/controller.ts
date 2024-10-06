
import { Request, RequestHandler, Response } from 'express';
import {prisma} from '../../data/postgres/index';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';


export class TodosController{
    //*Dependency Injection
    constructor(){};
    public getTodos = async (req:Request, res:Response) => {
        const todos = await prisma.todo.findMany();
        res.json(todos);
    };
    public getTodoById = async (req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({message: 'Invalid id'});
            return
        }
        const todo = await prisma.todo.findUnique({where: {id}});
        if(!todo){
            res.status(404).json({message: 'Todo not found'});
            return;
        }
        res.json(todo);
    }
    public createTodo = async (req:Request, res:Response) => {
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({error});
        
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });
        
        res.json(todo);
        
    }
    public updateTodo=  async(req:Request, res:Response) => {
        const id = +req.params.id;
        const [error,updateTodoDto] = UpdateTodoDto.create({...req.body,id});
        if (error) return res.status(400).json({error});

        const todo = await prisma.todo.findFirst({where: {id}});
        if(!todo){
            res.status(404).json({message: 'Todo not found with id: '+id});
            return;
        }
        const updatetodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values
        });
        res.json(updatetodo);
        return;
    }

    public deleleTodo = async (req:Request, res:Response) => {
        const id = +req.params.id;
        if (isNaN(id)){
            res.status(400).json({message: 'Invalid id'});
            return;
        }
        const todo = await prisma.todo.findUnique({where: {id}});
        if(!todo){
            res.status(404).json({message: 'Todo not found'});
            return;
        }
        const deleted = await prisma.todo.delete({where: {id}});
        (deleted) 
            ? res.json(deleted) 
            : res.status(400).json({message: 'Error deleting todo with id: '+id});
    }


}
