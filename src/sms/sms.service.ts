import { Injectable } from "@nestjs/common";

@Injectable()
export class SmsService{
    async sendSms(phone: string, otp: string){
        const formdata = new FormData();
        formdata.append('mobile_phone', phone);
        formdata.append('message', `Stadium code: ${otp}`);
        formdata.append('from', '4546');
        // formdata.append('sender_id', process.env.SMS_SENDER_ID);

        const config={
            method: 'post',
            maxBodyLength: Infinity,
            url: process.env.SMS_SERVICE_URL,
            headers:{
                Authorization: `Bearer ${process.env.SMS_TOKEN}`
            },
            data: formdata
        }
    }
}