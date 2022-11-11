import { Module } from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { EpisodeResolver, PodcastsResolver } from './podcasts.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Podcast } from './entities/podcast.entity';
import { Episode } from './entities/episode.entity';
import { Review } from "../review/entities/review.entity";
import { Subscription } from "./entities/subscription.entity";
import { Played } from "./entities/played.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Podcast, Episode, Review, Subscription, Played])],
  providers: [PodcastsService, PodcastsResolver, EpisodeResolver],
})
export class PodcastsModule {}
