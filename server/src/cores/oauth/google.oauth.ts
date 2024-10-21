import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { google } from 'googleapis';
import { Repository } from 'typeorm';
import { ConfigService } from '../../config/config.service';
import { User } from '../../user/user.entity';
import { UserProfile } from '../../user/userProfile.entity';
import $ from '../../util/exception.helper';

@Injectable()
export class GoogleOAuth {
  private readonly client: OAuth2Client;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService
  ) {
    this.client = new google.auth.OAuth2(
      this.configService.oauth.google.clientId,
      this.configService.oauth.google.clientSecret
    );
  }

  async findGoogleUser(idToken: string): Promise<TokenPayload> {
    try {
      const ticket = await this.client.verifyIdToken({ idToken });
      return ticket.getPayload();
    } catch (error) {
      $.throw(`payload not found`);
    }
  }

  async handleGoogleAuth(idToken: string): Promise<User> {
    const payload = await this.findGoogleUser(idToken);
    $.requiredEntity(payload);
    const { sub, email, picture, name, given_name, family_name } = payload;

    $.requiredEntity(email, 'No email information provided');

    const foundUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .orWhere('user.oauthClientUserId = :oauthClientUserId', {
        oauthClientUserId: sub,
      })
      .getOne();
    if (foundUser) {
      if (!foundUser.oauthClientUserId && foundUser.email === email) {
        foundUser.oauthClient = 'GOOGLE';
        foundUser.oauthClientUserId = sub;
        const updatedUser = await this.userRepository.save(foundUser);
        return updatedUser;
      }

      return foundUser;
    } else {
      const newPatient = new User();
      newPatient.email = email;
      // newPatient.username = email.substr(0, email.indexOf('@'));
      newPatient.role = User.RoleEnum.User;
      newPatient.oauthClient = 'GOOGLE';
      newPatient.oauthClientUserId = sub;
      newPatient.status = User.Status.Active;
      const newPatientProfile = new UserProfile();
      newPatientProfile.name = name;
      if (picture) {
        newPatientProfile.avatarPath = picture;
      }
      newPatient.UserProfile = newPatientProfile;
      const createdPatient = await this.userRepository.save(newPatient);
      $.requiredEntity(createdPatient);
      return createdPatient;
    }
  }
}
