import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity("tweets")
export class Tweet extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  text: string;

  @Column()
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tweets)
  creator: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
