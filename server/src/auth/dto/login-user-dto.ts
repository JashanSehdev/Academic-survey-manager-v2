import { IsNumberString, IsString, Length, MaxLength, Min, min } from 'class-validator';

export class LoginUserDto {
  @IsString()
  email: string;
}

export class LoginStudentDto extends LoginUserDto {
  @IsNumberString()
  @MaxLength(9)
  card_id: string;
}

export class LoginAdminDto extends LoginUserDto {
  @IsString()
  password: string;
}
