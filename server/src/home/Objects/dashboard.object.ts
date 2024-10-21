import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserTypeStats {
  @Field(() => String)
  role: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class WorkerAvailability {
  @Field(() => Int)
  working: number;

  @Field(() => Int)
  available: number;
}

@ObjectType()
export class MonthlyStats {
  @Field(() => Int)
  month: number;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class ProjectWorkerStatus {
  @Field(() => String)
  key: string;

  @Field(() => Int)
  count: number;

  @Field(() => String)
  month: string;

  @Field(() => String)
  year: string;
}

@ObjectType()
export class DailyProjectWorkerStatus extends ProjectWorkerStatus {
  @Field(() => String)
  day: string;
}

@ObjectType()
export class WeeklyProjectWorkerStats extends ProjectWorkerStatus {
  @Field(() => String)
  week: string;
}

@ObjectType()
export class ProjectsStats {
  @Field(() => Int)
  ongoing: number;

  @Field(() => Int)
  completed: number;
}

export interface ISelectedProjectData {
  project_id: number;
  startedAt: string;
  endedAt: string;
  workerCount: string;
  companyId: number;
  branchId?: number;
}
