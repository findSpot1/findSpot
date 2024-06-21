import { JwtPayload } from './jwt-payload.types';

export type JwtPayloadWithRefreshToekn = JwtPayload & { refreshToken: string };
