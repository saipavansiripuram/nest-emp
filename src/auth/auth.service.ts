import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { compare, hash } from 'bcrypt';
import { UserResponse } from './interfaces/user.interface';
import { JwtPayload, JwtResponse } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponse> {
    const existingUser = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(user);
    const { password: _, ...result } = savedUser;
    return result as UserResponse;
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserResponse | null> {
    const user = await this.usersRepository.findOne({ where: { username } });
    if (user && (await compare(password, user.password))) {
      const { password: _, ...result } = user;
      return result as UserResponse;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<JwtResponse> {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }
}
