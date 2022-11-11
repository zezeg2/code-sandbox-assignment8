import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { Podcast } from "../entities/podcast.entity";
import { CoreOutput } from "../../common/dtos/output.dto";

@InputType()
export class SubscribePodcastInput {
  @Field(() => Int)
  podcastId: number
}

@ObjectType()
export class SubscribePodcastOutput extends CoreOutput{
  @Field(() =>[Podcast], {nullable: true})
  result?: Podcast[]
}
