import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CoreEntity } from "../../common/entities/core.entity";
import { Podcast } from "./podcast.entity";
import { Played } from "./played.entity";

@Entity()
@ObjectType()
@InputType('EpisodeInput', { isAbstract: true })
export class Episode extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  title: string;

  @Column()
  @Field(() => String)
  @IsString()
  category: string;

  @ManyToOne(() => Podcast, podcast => podcast.episodes, {
    onDelete: 'CASCADE',
  })
  @Field(() => Podcast)
  podcast: Podcast;
  
  @Field(() => [Played])
  @OneToMany(() => Played, (played) => played.episode)
  playedUsers: Played[]
}
