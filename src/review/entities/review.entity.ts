import { Column, Entity, ManyToOne } from "typeorm";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "../../common/entities/core.entity";
import { User } from "../../users/entities/user.entity";
import { Podcast } from "../../podcast/entities/podcast.entity";

@InputType('ReviewInput', { isAbstract: true })
@ObjectType()
@Entity()
export class Review extends CoreEntity{
  @Field(() => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.reviews, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  podcast: Podcast
  
  @Field(() => User)
  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  user: User
  
  @Field(() => String)
  @Column()
  content: string
  
  @Field(() => Boolean)
  @Column({default: false})
  isEdited: boolean
}