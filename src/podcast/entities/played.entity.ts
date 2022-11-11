import { Entity, ManyToOne } from "typeorm";
import { InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "../../common/entities/core.entity";
import { User } from "../../users/entities/user.entity";
import { Episode } from "./episode.entity";

@InputType('PlayedInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Played extends CoreEntity{
  @ManyToOne(() => User, (user) => user.playedEpisodes, {lazy: true, onDelete: "CASCADE"})
  user: User
  @ManyToOne(() => Episode, (episode) => episode.playedUsers, { lazy: true, onDelete: "CASCADE" })
  episode: Episode
}