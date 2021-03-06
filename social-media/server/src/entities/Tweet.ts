import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reply } from "./Reply";
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

  // Creator Start
  @Column()
  creatorId: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tweets)
  creator: User;
  // Creator End

  @Field(() => [Reply])
  @OneToMany(() => Reply, (reply) => reply.parent, { onDelete: "CASCADE" })
  replies: Reply[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
