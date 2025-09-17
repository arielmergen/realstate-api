import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from '../../decorators';
import {
  AuthInput,
  RefreshInput,
  Tokens,
  RegisterUserInput,
  User,
  UserInput,
} from '../../entities';
import { AuthService } from './auth.service';
import { JwtRefreshAuthGuard } from './guards/auth-refresh.guard';
import { JwtAuthGuard } from './guards/auth.guard';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(@Args('authInput') authInput: AuthInput): Promise<Tokens> {
    return await this.authService.login(authInput);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Mutation('logout')
  async logout(@CurrentUser() user: UserInput) {
    return await this.authService.logout(user);
  }

  @Mutation('register')
  async register(
    @Args('userInput') userInput: RegisterUserInput,
  ): Promise<Tokens> {
    return await this.authService.register(userInput);
  }

  @Mutation('googleLogin')
  async googleLogin(): Promise<Tokens> {
    return await this.authService.googleLogin();
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Mutation('refresh')
  async refresh(
    @Args('refreshInput') refreshInput: RefreshInput,
    @CurrentUser() user: User,
  ): Promise<Tokens> {
    return await this.authService.refresh(user, refreshInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateSession')
  async updateSession(
    @Args('refreshInput') refreshInput: RefreshInput,
    @Args('user') user: UserInput,
  ): Promise<Tokens> {
    return await this.authService.updateSession(user, refreshInput);
  }
}
