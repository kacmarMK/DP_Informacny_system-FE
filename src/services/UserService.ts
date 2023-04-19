import User from "../interfaces/User"
import http from "@/http-common"
class UserService {

    login(user: User): Promise<any> {
        return http.get('user/loginUser/' + user.name + '/' + user.password);
    }

    googleLogin(email: string){
        return http.get('user/googleLoginUser/' + email)
    }

    getUser(user_id: string): Promise<any> {
        return http.get('user/getUserById/' + user_id)
    }

    getAllUsers(): Promise<any> {
        return http.get('user/');
    }

    addUser(user: User): Promise<any> {
        return http.post('user/create', user)
    }

    updateUser(user: User): Promise<any> {
        return http.put('user/updateUser', user)
    }

    deleteUser(user_id: string): Promise<any> {
        return http.delete('user/deleteUser' + user_id)
    }

} 

export default new UserService;
