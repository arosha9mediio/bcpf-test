import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { User } from '../../user/user.entity';
import { UserProfile } from '../../user/userProfile.entity';
import $ from '../../util/exception.helper';
import { randomNickName } from 'src/util/randomPassword';

/**
 * refactoring this
 * integrate google, facebook into here
 */
@Injectable()
export class CommonOAuth2 {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async handleKakaoAuth(accessToken: string): Promise<User> {
    try {
      const payload = await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      $.requiredEntity(payload.data.id);

      const { id, properties = {}, kakao_account = {} } = payload.data;

      // @todo : below code should be integrated as one.
      const email = kakao_account.email;
      $.requiredEntity(email, 'No email information provided');

      const foundUser = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .orWhere('user.oauthClientUserId = :oauthClientUserId', {
          oauthClientUserId: id,
        })
        .getOne();

      if (foundUser) {
        if (!foundUser.oauthClientUserId && foundUser.email === email) {
          foundUser.oauthClient = 'KAKAO';
          foundUser.oauthClientUserId = id;
          const updatedUser = await this.userRepository.save(foundUser);
          return updatedUser;
        }
        return foundUser;
      } else {
        const newPatient = new User();
        newPatient.email = email;
        newPatient.role = User.RoleEnum.User;
        newPatient.oauthClient = 'KAKAO';
        newPatient.oauthClientUserId = id;
        newPatient.status = User.Status.Active;
        const newPatientProfile = new UserProfile();
        newPatientProfile.name = randomNickName();
        newPatientProfile.avatarPath = properties.thumbnail_image || '';

        newPatient.UserProfile = newPatientProfile;
        const createdPatient = await this.userRepository.save(newPatient);
        $.requiredEntity(createdPatient);
        return createdPatient;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleNaverAuth(accessToken: string): Promise<User> {
    try {
      const payload = await axios({
        method: 'get',
        url: 'https://openapi.naver.com/v1/nid/me',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      $.requiredEntity(payload.data.response.id);
      console.log({ ...payload });

      const { id, name, email, profile_image } = payload.data.response;
      $.requiredEntity(email, 'No email information provided');

      // @todo : below code should be integrated as one.
      const foundUser = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .orWhere('user.oauthClientUserId = :oauthClientUserId', {
          oauthClientUserId: id,
        })
        .getOne();

      if (foundUser) {
        if (!foundUser.oauthClientUserId && foundUser.email === email) {
          foundUser.oauthClient = 'NAVER';
          foundUser.oauthClientUserId = id;
          const updatedUser = await this.userRepository.save(foundUser);
          return updatedUser;
        }

        return foundUser;
      } else {
        const newPatient = new User();
        newPatient.email = email;
        newPatient.role = User.RoleEnum.User;
        newPatient.oauthClient = 'NAVER';
        newPatient.oauthClientUserId = id;
        newPatient.status = User.Status.Active;
        const newPatientProfile = new UserProfile();
        newPatientProfile.name = name || randomNickName();
        newPatientProfile.avatarPath = profile_image || '';
        newPatient.UserProfile = newPatientProfile;
        const createdPatient = await this.userRepository.save(newPatient);
        $.requiredEntity(createdPatient);
        return createdPatient;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
