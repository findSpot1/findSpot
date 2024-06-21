import { IsIn, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateWorkTimeDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ])
  Day: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  open_time: string;
  @IsNotEmpty()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
  close_time: string;
  @IsNumber()
  @IsNotEmpty()
  business_id: number;
}
