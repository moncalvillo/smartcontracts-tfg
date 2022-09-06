

export default abstract class IAuthService {
    abstract getGoogleUser(token: string): Promise<any>;
}