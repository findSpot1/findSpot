import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICreateAdminAttr {
  name: string;
  email: string;
  phone:string;
  passportID: string;
  admin_photo: string;
  hashed_password: string;
  confirm_password: string;
  telegram_link: string;
  is_active: boolean;
  is_creater: boolean;
  hashed_refresh_token:string;
}


@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, ICreateAdminAttr> {
  @ApiProperty({
    example: 1,
    description: 'Unique identifier of the admin',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'adminName',
    description: 'Name of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  name: string;

  @ApiProperty({
    example: '90092****',
    description: 'Phone_number of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'AD0172143',
    description: 'PassportID of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  passportID: string;

  @ApiProperty({
    example: 'admin',
    description: 'Login of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  email: string;

  @ApiProperty({
    example: 'telegram_link',
    description: 'Telegram link of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  telegram_link: string;

  @ApiProperty({
    example: 'admin_photo',
    description: 'Photo of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  admin_photo: string;

  @ApiProperty({
    example: 'hashed_password',
    description: 'Hashed password of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'example0403',
    description: 'Confirm password of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  confirm_password: string;

  @ApiProperty({
    example: 'is_active',
    description: 'Is active of the admin',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'is_creater',
    description: 'Is creater of the admin',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creater: boolean;

  @ApiProperty({
    example: 'hashed_refresh_token',
    description: 'Hashed refresh token of the admin',
  })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
