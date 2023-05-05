import dotenv from 'dotenv';
import nodemailer, {Transporter, TransportOptions} from 'nodemailer';

dotenv.config();

export class MailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
        } as TransportOptions);
    }

    public async sendActivationMail(to: string, link: string) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Подтверждение электронной почты',
            text: '',
            html:
                `
                    <div>
                        <h3>Подтверждение почты</h3>
                        <p>Для подтверждения адреса электронной почты, просто нажмите на кнопку "Подтвердить" ниже:</p>
                        <p><a href="${link}" style="display: inline-block; background-color: #4CAF50; color: white; 
                        padding: 10px 20px; text-align: center; text-decoration: none; border-radius: 5px;">Подтвердить</a>
                        </p>
                    </div>
                `
        })
    }
}

export default new MailService();