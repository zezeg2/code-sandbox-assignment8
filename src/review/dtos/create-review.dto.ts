import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "../../common/dtos/output.dto";
import { Review } from "../entities/review.entity";

@InputType()
export class CreateReviewInput extends PickType(Review, ['content'], InputType) {
  @Field(() => Int)
  podcastId: number;
}

@ObjectType()
export class CreateReviewOutput extends CoreOutput {}
