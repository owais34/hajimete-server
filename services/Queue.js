

class Queue{
    constructor(queue){
        this.queue=[]
    }

    push(element)
    {
        this.queue.push(element)
    }

    pop()
    {
        return this.queue.shift()
    }
    size(){
        return this.queue.length;
    }
    peek()
    {
        if(this.queue.length>0)
        return this.queue[0];
        else
        return null;
    }
}

module.exports={
    Queue
}