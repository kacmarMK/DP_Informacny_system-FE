import http from "@/http-common";
import Team from "../interfaces/Team"

class TeamService {

    getTeamById(teamId: string): Promise<any>{
        return http.get('team/getTeamById/' + teamId);
    }

    getTeamsByUserID(userId: string): Promise<any>{
        return http.get('team/getAllTeamsByUserId/' + userId);
    }

    getAllTeamsByCompanyId(id: string): Promise<any>{
        return http.get('team/getAllTeamsByCompany?company=' + id)
    }

    addTeam(team: Team): Promise<any>{
        return http.post('team/addTeam', team)
    }

    removeTeam(teamId: string): Promise<any>{
        return http.delete('team/deleteTeam/' + teamId)
    }

}

export default new TeamService;