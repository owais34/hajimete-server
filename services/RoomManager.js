

class RoomManager{
    constructor(roomMap,currentRoom){
        this.roomMap=new Map();
        this.currentRoom=this.generateRoomId();
        this.roomMap.set(currentRoom,0)
    }

    getRoom() {

        if(this.roomMap.get(this.currentRoom)<2)
        return this.currentRoom;
        else{
            this.currentRoom=this.generateRoomId()
            this.roomMap.set(this.currentRoom,0);
            return this.currentRoom;
        }
    }

    generateRoomId(){
        let id="Room_"+Math.floor(Math.random()*1000000);
        while(this.roomMap.has(id))
        {
            id="Room_"+Math.floor(Math.random()*1000000)
        }
        return id;
    }

    addOccupant(roomId){
        let currOccupancy=this.roomMap.get(roomId)+1
        this.roomMap.set(roomId,currOccupancy)
    }

    getNumberOfOccupants(roomId){
        return this.roomMap.get(roomId)
    }
    removeRooom(roomId){
        this.roomMap.delete(roomId)
    }
}

const roomManager=new RoomManager();

module.exports ={roomManager}