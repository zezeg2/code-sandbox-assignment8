import { Entity, ManyToOne } from "typeorm";
import { ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "../../common/entities/core.entity";
import { User } from "../../users/entities/user.entity";
import { Podcast } from "./podcast.entity";

@ObjectType()
@Entity()
export class Subscription extends CoreEntity {
  @ManyToOne(() => User, (user) => user.subscriptions, {lazy: true, onDelete: 'CASCADE'})
  user: User
  @ManyToOne(() => Podcast, (podcast) => podcast.subscribers, {lazy: true, onDelete: 'CASCADE'})
  podcast: Podcast
}