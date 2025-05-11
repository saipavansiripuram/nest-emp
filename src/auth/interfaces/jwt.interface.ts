export interface JwtPayload {
  username: string;
  sub: number;
}

export interface JwtResponse {
  access_token: string;
}
