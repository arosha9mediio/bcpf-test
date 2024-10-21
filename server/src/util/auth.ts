import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorCode } from '../constants/error';
import { User } from '../user/user.entity';

export function checkIsOwner(
  user: User = null,
  ownerId: string,
  isthrow = true
): boolean | HttpException {
  if (user != null && ownerId == user.id) {
    return true;
  }
  return returnHandeler(isthrow);
}

export function checkCanHandle(
  user: User = null,
  ownerId: string,
  isthrow = true
): boolean | HttpException {
  if (checkIsAdmin(user) || (user != null && ownerId == user.id)) {
    return true;
  }
  return returnHandeler(isthrow);
}

export function checkCurrentUserCanHandle(
  user: User = null,
  ownerId: string,
  isthrow = true
): boolean | HttpException {
  if (checkIsAdmin(user, false) || (user != null && ownerId == user.id)) {
    return true;
  }
  return returnHandeler(isthrow);
}

export function checkIsAdmin(
  user: User = null,
  isthrow = false
): boolean | HttpException {
  if (user != null && user.role == User.RoleEnum.Admin) {
    return true;
  }
  return returnHandeler(isthrow);
}

function returnHandeler(isthrow: boolean): boolean | HttpException {
  if (isthrow === true) {
    throw new ForbiddenException();
  } else {
    return false;
  }
}
