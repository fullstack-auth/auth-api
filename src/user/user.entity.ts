import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  mail: string;

  @Column()
  birthDate: string;

  @Column()
  gender: string;

  @Column()
  phoneNumber: number;

  @Column()
  adress: string;

  @Column()
  country: string;
}
