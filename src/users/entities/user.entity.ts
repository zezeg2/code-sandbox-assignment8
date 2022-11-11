import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEmail, IsString } from "class-validator";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";

import * as bcrypt from "bcrypt";
import { InternalServerErrorException } from "@nestjs/common";
import { CoreEntity } from "../../common/entities/core.entity";
import { Review } from "../../review/entities/review.entity";
import { Subscription } from "../../podcast/entities/subscription.entity";
import { Played } from "../../podcast/entities/played.entity";

export enum UserRole {
  Host = 'Host',
  Listener = 'Listener',
}

registerEnumType(UserRole, { name: 'UserRole' });

@InputType('UserInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsEmail()
  email: string;

  @Column()
  @Field(() => String)
  @IsString()
  password: string;

  @Column({ type: 'simple-enum', enum: UserRole })
  @Field(() => UserRole)
  role: UserRole;
  
  @Field(() => [Review])
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[]
  
  @Field(() => [Subscription])
  @OneToMany(() => Subscription, (subscription) => subscription.user)
  subscriptions: Subscription[]
  
  @Field(() => [Played])
  @OneToMany(() => Played, (played) => played.user)
  playedEpisodes: Played[]
  

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (!this.password) {
      return;
    }
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
