import { Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class NotificationService {
    sendEmail(to: string, subject: string, message: string): void {
        if (!to) throw new BadRequestException(`email is empty`);
        console.log(`Email sent to ${to}: ${subject}: "${message}"`);
    }

    sendSMS(to: string, message: string): void {
        if (!to) throw new BadRequestException(`phone is empty`);
        console.log(`SMS sent to ${to}: ${message}`);
    }
}
