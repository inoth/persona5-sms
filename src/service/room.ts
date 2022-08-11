import request from '../request'

class RoomService {
    joinRoom(roomid: string): Promise<any> {
        roomid = 'default-room'
        let params = {
            "roomid": roomid
        }
        return request.post("/join/room", params)
    }
}

export default new RoomService();