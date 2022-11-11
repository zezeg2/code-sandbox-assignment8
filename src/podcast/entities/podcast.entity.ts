import { Episode } from './episode.entity';
import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { IsString, Min, Max, IsNumber } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Subscription } from "./subscription.entity";
import { Review } from "../../review/entities/review.entity";

@Entity()
@ObjectType()
@InputType('PodcastInput', {isAbstract: true})
export class Podcast extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  title: string;

  @Column()
  @Field(() => String)
  @IsString()
  category: string;

  @Column({ default: 0 })
  @Field(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;
  
  
  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.podcast)
  reviews: Review[]

  @OneToMany(() => Episode, episode => episode.podcast, {lazy: true})
  @Field(() => [Episode])
  episodes: Episode[];
  
  @OneToMany(() => Subscription, (subscription) => subscription.podcast)
  @Field(() => [Subscription])
  subscribers: Subscription[]
}
