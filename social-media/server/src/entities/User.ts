import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import bcrypt from "bcryptjs";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}
