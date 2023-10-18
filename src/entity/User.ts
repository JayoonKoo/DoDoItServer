import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 30 })
  nickname: string;

  @Column({ nullable: false, unique: true, length: 30 })
  email: string;

  @Column({ nullable: false, length: 100 })
  password: string;
}
