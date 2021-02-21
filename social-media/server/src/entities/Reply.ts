import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Tweet } from "./Tweet";
import { User } from "./User";

@ObjectType()
@Entity("replies")
export class Reply extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  text: string;

  // Parent Start
  @Column()
  parentId: string;

  @Field(() => Tweet)
  @ManyToOne(() => Tweet, (tweet) => tweet.replies)
  parent: Tweet;
  // Parent End

  // Creator Start
  @Column()
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User)
  creator: User;
  // Creator End

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
