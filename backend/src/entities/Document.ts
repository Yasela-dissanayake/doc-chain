import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id!: number; // Use the definite assignment assertion operator (!)

  @Column()
  name!: string;

  @Column()
  cid!: string;

  @Column()
  type!: string;

  @Column()
  ownerId!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  timestamp!: Date;
}
