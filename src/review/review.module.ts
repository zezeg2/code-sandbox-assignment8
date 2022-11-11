import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewResolver } from './review.resolver';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Podcast } from "../podcast/entities/podcast.entity";
import { Episode } from "../podcast/entities/episode.entity";
import { User } from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Review, Podcast, Episode, User])],
  providers: [ReviewService, ReviewResolver]
})
export class ReviewModule {}
