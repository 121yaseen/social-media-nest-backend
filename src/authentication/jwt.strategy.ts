import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "5p1d3rM4N15P3t3RP4rK3r" // save this over environment variable
        });
    }

    async validate(payload: any) {
        const user = await this.userService.findOne(payload.username);
        return {
            id: user.id,
            name: user.name
        };
    }
}