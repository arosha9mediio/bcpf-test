/**
 * Home Controller
 *
 */

import { Controller, Injectable, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../cores/decorators/user.decorators';
import { GqlAuthGuard } from '../cores/guards/jwtAuth.guard';
import { User } from '../user/user.entity';
import { AWSService } from '../util/aws.service';

@Injectable()
@Controller('home')
@Resolver()
export class HomeController {
  constructor(private readonly awsService: AWSService) {}
  // @Get('deeplink')
  // async detail(
  //   @HttpQuery('path') path: string,
  //   @CurrentUser() user: User,
  //   @Res() res
  // ) {
  //   console.log(path);
  //   res.render('../views/home/deeplink', { path, user });
  // }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async createPresignedPost(
    @Args('type', { type: () => String, nullable: false }) type: string,
    @Args('path', { type: () => String, nullable: true }) path: string,
    @Args('isProtected', {
      type: () => Boolean,
      nullable: true,
      defaultValue: true,
    })
    isProtected: boolean,
    @CurrentUser() user: User
  ): Promise<string> {
    return this.awsService.createPresignedPost(type, path, isProtected);
  }

  //@UseGuards(GqlAuthGuard)
  // @Get('img')
  // async proxyImage(@Qr('url') url: string, @Response() res: ExRes) {
  //   try {
  //     const response = await axios.get(url, { responseType: 'arraybuffer' });
  //     const contentType = response.headers['content-type'];
  //     const contentLength = response.headers['content-length'];
  //     res.set('Content-Type', contentType);
  //     res.set('Content-Length', contentLength);
  //     res.end(response.data, 'binary');
  //   } catch (error) {
  //     res.status(500).send('Proxy Error');
  //   }
  // }
  // -----------------------------------------------------------------------------
}
