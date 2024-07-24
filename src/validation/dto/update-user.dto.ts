import { IsString, Length, IsEmail, IsOptional, IsInt } from 'class-validator';

export class UpdateUserDTO {
  @IsString({ message: 'Nama Lengkap Harus String' })
  @IsOptional()
  namaLengkap?: string;

  @IsString()
  @IsOptional()
  @Length(3, 30, { message: 'Username harus ada di antara 3 and 30 huruf' })
  username?: string;

  @IsEmail({}, { message: 'Email tidak valid' })
  @IsOptional()
  email?: string;

  @IsInt({ message: 'Role tidak valid' })
  @IsOptional()
  role_id: number;
}
