import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { Review } from "./entities/review.entity";
import { CreateReviewInput, CreateReviewOutput } from "./dtos/create-review.dto";
import { ReviewService } from "./review.service";
import { AuthUser } from "../auth/auth-user.decorator";
import { Role } from "../auth/role.decorator";
import { UserRole } from "../users/entities/user.entity";

@Resolver(() => Review)
export class ReviewResolver {
  constructor(private readonly reviewService: ReviewService) {
  }
  @Mutation(() => CreateReviewOutput)
  @Role([UserRole.Listener])
  async createReview(@AuthUser() user, @Args('input') createReviewInput: CreateReviewInput): Promise<CreateReviewOutput> {
    return await this.reviewService.createReview(user, createReviewInput)
  }
}