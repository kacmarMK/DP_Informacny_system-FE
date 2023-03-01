import http from "@/http-common";

class FavoriteService {

    deleteById(id: string): Promise<any> {
        return http.delete("favorite/deleteById?Id=" + id);
    }
}

export default new FavoriteService;