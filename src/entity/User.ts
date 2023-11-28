import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  nickname: string;

  @Column({ unique: true, length: 30 })
  email: string;

  @Column({ length: 100 })
  password: string;

  @Column({ length: 200 })
  refreshToken: string;
}
