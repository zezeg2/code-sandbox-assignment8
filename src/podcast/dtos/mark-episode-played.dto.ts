import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "../../common/dtos/output.dto";

@InputType()
export class MarkEpisodeAsPlayedInput {
  @Field(() => Int)
  episodeId: number
}

@ObjectType()
export class MarkEpisodeAsPlayedOutput extends CoreOutput{}
