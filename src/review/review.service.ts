import { Injectable } from '@nestjs/common';
import { CreateReviewInput } from "./dtos/create-review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Podcast } from "../podcast/entities/podcast.entity";
import { Repository } from "typeorm";
import { Review } from "./entities/review.entity";
import { User } from "../users/entities/user.entity";
import { Episode } from "../podcast/entities/episode.entity";

@Injectable()
export class ReviewService {
  
  constructor(
    @InjectRepository(Podcast) private readonly podcastRepository:Repository<Podcast>,
    @InjectRepository(Episode) private readonly episodeRepository:Repository<Episode>,
    @InjectRepository(Review) private readonly reviewRepository:Repository<Review>,
    @InjectRepository(User) private readonly userRepository:Repository<User>) {
  }
  
  async createReview(user: User, { podcastId ,content }: CreateReviewInput) {
    try {
      const podcast = await this.podcastRepository.findOne({ where: { id: podcastId } })
      if (!podcast) throw new Error('Episode not found')
      const review = this.reviewRepository.create();
      review.user = user;
      review.content = content;
      review.podcast= podcast;
      await this.reviewRepository.save(review)
      return {
        ok: true
      }
    } catch (error){
      return {
        ok: false,
        error: error.message
      }
    }
    
  }
}
