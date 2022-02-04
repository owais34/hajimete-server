const {userRoomUtil}=require('./UserQueue')
const {Queue} =require('./Queue')


class QueLoop{
    constructor(socketQueue){
        this.socketQueue=new Queue();
    }

    addUser(socket,io){
        this.socketQueue.push(socket)
        io.to(socket.id).emit("waiting")
    }

    runLoop(io)
    {
       
            
            if(this.socketQueue.size()>=2)
            {
                let socket1=this.socketQueue.pop()
                let socket2=this.socketQueue.pop();
                userRoomUtil.assignRoom(socket1.id,socket2.id)
                userRoomUtil.assignRoom(socket2.id,socket1.id)
                io.to(socket1.id).emit("partner_found")
                io.to(socket2.id).emit("partner_found")
            }
    }

    removeUser(socket,io){
        let userToNotify=userRoomUtil.getRoom(socket.id)
        if(userToNotify)
        io.to(userToNotify).emit("partner_disconnected")
        
        userRoomUtil.removeRoom(userToNotify)
        userRoomUtil.removeRoom(socket.id)
    }
}



module.exports={
    QueLoop
}