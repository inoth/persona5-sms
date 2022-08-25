import request from '../request'

class LoginService {
    login(name: string): Promise<any> {
        let params = {
            "userName": name
        }
        return request.post("/login", params)
    }
}

export default new LoginService();
