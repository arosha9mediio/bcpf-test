import { InputType, PickType } from '@nestjs/graphql';

import { Contest } from '../contests.entity';

@InputType()
export class CreateContestDTO extends PickType(
  Contest,
  [
    'content',
    'contestType',
    'startDate',
    'endDate',
    'applyNumberPrefix',
    'applyYn',
    'file',
    'guideUrl',
    'highlight',
    'snippet',
    'sort',
    'statusId',
    'title',
    'userId',
    'viewMain',
    'views',
  ] as const,
  InputType
) {}
