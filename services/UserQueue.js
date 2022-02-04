
class UserRoomUtil{

    constructor(userMap){
        this.userMap=new Map();
    }

    assignRoom(socketId,roomId)
    {
        this.userMap.set(socketId,roomId)
    }

    removeRoom(socketId)
    {
       this.userMap.delete(socketId)
    }

    getRoom(socketId){
        return this.userMap.get(socketId)
    }
}

const userRoomUtil=new UserRoomUtil()

module.exports={
    userRoomUtil
}