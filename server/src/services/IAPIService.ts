
export default abstract class IAPIService {
    abstract firstQuery(): Promise<any>;
    abstract getRegisteredUsers(): Promise<any>;
}