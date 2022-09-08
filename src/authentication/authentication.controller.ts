import { Request, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authenticationService: AuthenticationService) { }

    @Get('status')
    getStatus(): string {
        return this.authenticationService.getStatus();
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req: any): any {
        return this.authenticationService.login(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('protected')
    getHello(@Request() req: any) {
        return req.user;
    }
}
