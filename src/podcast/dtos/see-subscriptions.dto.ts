import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "../../common/dtos/output.dto";
import { Podcast } from "../entities/podcast.entity";

@ObjectType()
export class SeeSubscriptionsOutput extends CoreOutput{
  @Field(() => [Podcast], {nullable: true})
  result?: Podcast[]
}