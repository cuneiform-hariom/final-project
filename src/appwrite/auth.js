import { Client, Account, ID } from "appwrite"
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWrite)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount
            }
        }
        catch (error) {
            throw error;
        }
    }
    
    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            await this.account.get();
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService()

export default authService;