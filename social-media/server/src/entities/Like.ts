import { Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Like {
  @PrimaryColumn()
  creatorId: string;

  @PrimaryColumn()
  tweetId: string;
}
