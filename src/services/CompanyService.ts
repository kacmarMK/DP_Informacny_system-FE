import Company from '@/interfaces/Company';
import http from "@/http-common";
class CompanyServices {

    getCompany(companyId: string): Promise<any> {
        return http.get("company/getCompanyById/" + companyId);
    }

    getAllPermissions(id: string): Promise<any> {
        return http.get("" + id);
    }
    
    addCompany(company: Company): Promise<any> {
        return http.post("company/addCompany", company)
    }

    getCompanyIdByUserId(userId: string){
        return http.get("company/getAllCompaniesByUserId/" + userId);
    }
}

export default new CompanyServices;