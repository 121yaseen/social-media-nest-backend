import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'hidden-string',// Should be Hidden
        });
    }

    async validate(payload: any) { // payload = decoded JWT
        // use get user if you want to include any other property in the context
        return { userId: payload.sub, username: payload.username};
    }
}