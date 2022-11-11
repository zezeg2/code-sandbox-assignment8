import { ArgsType, Field, ObjectType } from "@nestjs/graphql";
import { Podcast } from "../entities/podcast.entity";
import { CoreOutput } from "../../common/dtos/output.dto";

@ArgsType()
export class SearchPodcastInput {
  @Field(() => String)
  query: string
}

@ObjectType()
export class SearchPodcastOutput extends CoreOutput{
  @Field(() =>[Podcast], {nullable: true})
  result?: Podcast[]
}
