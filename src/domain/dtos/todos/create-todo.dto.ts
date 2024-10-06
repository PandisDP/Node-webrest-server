


export class CreateTodoDto {

    constructor(
        public readonly text: string
    ) {}
    static create(propos:{[key:string]:any}): [string?,CreateTodoDto?]{
        const {text} = propos;
        if (!text) return ['Invalid text',undefined];

        return [undefined,new CreateTodoDto(text)];
    }
}