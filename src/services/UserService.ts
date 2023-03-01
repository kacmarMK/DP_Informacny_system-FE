import User from "../interfaces/User"
import http from "@/http-common"
class UserService {

    login(user: User): Promise<any> {
        return http.get('user/getUserByNickNameAndPassword?nickName=' + user.nickName + '&password=' + user.password);
    }

    getUser(id: string): Promise<any> {
        return http.get('user/getUserById/' + id)
    }

    getAllUser(): Promise<any> {
        return http.get('user/getAllUsers');
    }

    addUser(user: User): Promise<any> {
        return http.post('user/addUser', user)
    }

    googleLogin(email: string){
        return http.get('user/getUserByEmail?email=' + email)
    }
    
} 

export default new UserService;
