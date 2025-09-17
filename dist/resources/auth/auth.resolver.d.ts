import { AuthInput, RefreshInput, Tokens, RegisterUserInput, User, UserInput } from '../../entities';
import { AuthService } from './auth.service';
export declare class AuthResolver {
    private readonly authService;
    constructor(authService: AuthService);
    login(authInput: AuthInput): Promise<Tokens>;
    logout(user: UserInput): Promise<null>;
    register(userInput: RegisterUserInput): Promise<Tokens>;
    googleLogin(): Promise<Tokens>;
    refresh(refreshInput: RefreshInput, user: User): Promise<Tokens>;
    updateSession(refreshInput: RefreshInput, user: UserInput): Promise<Tokens>;
}
