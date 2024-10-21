import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import axios from 'axios';
import _ from 'lodash';
import nodemailer from 'nodemailer';
import sesTransport from 'nodemailer-ses-transport';
import Mail from 'nodemailer/lib/mailer';
import path from 'path';
import { ConfigService } from '../config/config.service';
import { DirectSendEmailDto } from './dto/directSendDto';
import { DirectSendSMSDto } from './dto/directSendDto';

@Injectable()
export class MessageService {
  private readonly transport: Mail;

  getMailTemplatePath = (filename: string) => {
    return path.join(__dirname, '..', 'views', 'email', filename);
  };

  constructor(private readonly configService: ConfigService) {
    // nodemailer for AWS
    this.transport = nodemailer.createTransport(
      sesTransport({
        accessKeyId: configService.aws.accessKeyId,
        secretAccessKey: configService.aws.secretAccessKey,
        region: configService.aws.region,
      })
    );

    const contactUs = `${this.configService.static.front}/contact-us`;
    const policy = `${this.configService.static.front}/policy`;
  }

  // todo : error 처리
  async sendEmail(options: Mail.Options): Promise<boolean> {
    if (process.env.NODE_ENV === 'dev') {
      options.subject = '[테스트전송입니다.]' + options.subject;
    } else {
    }

    options.from = this.configService.email.options.sender;
    return await this.transport.sendMail(options);
  }

  // this is api key of the lcventures.
  // const sender: string = '01082970902';
  // const username: string = 'lcventures';
  // const key: string = 'qCASqrfwQ2olWpj';
  async directSendEmail(dto: DirectSendEmailDto): Promise<boolean> {
    const url = 'https://directsend.co.kr/index.php/api_v2/mail_change_word';

    const sender = this.configService.email.options.sender;
    const sender_name = this.configService.static.adminName;
    // const sender = 'wecle@lcventures.co.kr';
    // const sender_name = '방송콘텐츠진흥재단';

    // const sender = this.configService.directSend.email.sender;
    // const sender_name = this.configService.directSend.sender_name;

    const username = 'wannab';
    const key = 'Hhw4639EPG7PWub';

    const body = _.assign(dto, {
      receiver: JSON.stringify(dto.receiver),
      key,
      username,
      sender,
      sender_name,
    });

    await axios
      .post(url, body, {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
        },
      })
      .catch((error) => {
        console.log({ ...error });
        throw error;
      })
      .then((res) => {
        console.log(res);
      });

    return true;
  }

  async postPushNotification(
    token: string,
    title: string,
    body: string,
    type: string,
    link = '/main/tab/home'
  ): Promise<boolean> {
    if (!token) return null;
    const messages = [];

    messages.push({
      notification: {
        title,
        body,
      },
      data: { link, type },
      token,
    });

    admin
      .messaging()
      .sendAll(messages)
      .then(function (response) {
        console.log('Successfully sent message: : ', response);
      })
      .catch(function (err) {
        console.log('Error Sending message!!! : ', err);
      });
    // this.sendKakaoTalk('10293', [
    //   {
    //     phone: '01090411788',
    //     templateParam: ['박종관', '하하하'],
    //   },
    // ]);
    return true;
  }

  postPushNotificationByTopic(
    topic: string,
    title: string,
    body: string,
    link = '/main/tab/home',
    type = 'default',
    extra: string = JSON.stringify({})
  ): boolean {
    const messages = [];

    messages.push({
      topic,
      notification: {
        title,
        body,
      },
      data: { link, type, ...JSON.parse(extra) },
    });

    admin
      .messaging()
      .sendAll(messages)
      .then(function (response) {
        console.log('Successfully sent message: : ', response);
      })
      .catch(function (err) {
        console.log('Error Sending message!!! : ', err);
      });

    return true;
  }

  async sendSMS(dto: DirectSendSMSDto): Promise<boolean> {
    const url = 'https://directsend.co.kr/index.php/api_v2/sms_change_word';
    const allowedPhones = ['01090411788', '01029460320', '01048460409'];
    const filteredReceiver = dto.receiver.filter((item) => {
      console.log(item);
      return allowedPhones.includes(item.mobile);
    });
    console.log(filteredReceiver);
    const body = _.assign(dto, {
      receiver: JSON.stringify(dto.receiver),
      username: 'mediio',
      key: 'rF1pkfjqCZiiGRM',
      sender: '01082970902',
    });

    await axios
      .post(url, body, {
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
        },
      })
      .catch((error) => {
        console.log({ ...error });
        throw error;
      })
      .then((res) => {
        // console.log(res);
      });

    return true;
  }

  async sendKakaoTalk(templateCode: string, list: [any]): Promise<boolean> {
    try {
      const data = {
        templateCode,
        reSend: 'N',
        list,
      };
      //아임포트 환불 API 호출
      const headers = {
        'Content-type': 'application/json;charset=UTF-8',
        AUTH: Buffer.from(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Ilk0V0xETU5PWlFIN0pJNlZQMzk2MTJFMDBCNTJGN0JBIg._ESfyKQejidt63QROMrYtBSJlslQ9sAdJY2gdta1iqc',
          'utf8'
        ).toString('base64'),
      };
      const refundRet = await axios({
        url: 'https://biz.service.iwinv.kr/api/send/',
        method: 'POST',
        headers,
        data: data,
      });

      console.log(refundRet);

      return !!refundRet.data.response;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
