import request from '../request'

class RoomService {
    createRoom(title: string): Promise<any> {
        let params = {
            "title": title,
            "desc": "",
            "maxUser": 10
        }
        return request.post("/room/create", params)
    }
    closeRoom(rid: string): Promise<any> {
        let params = {
            rid: rid
        }
        return request.post("/room/close", params)
    }
    exitRoom(rid: string): Promise<any> {
        let params = {
            rid: rid
        }
        return request.post("/room/exit", params)
    }
    joinRoom(rid: string) {
        // 采用websocket
    }
}

export default new RoomService();