import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Program {
  @PrimaryGeneratedColumn()
  programId!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string;

  @Column({ type: 'int', nullable: true })
  personId!: number;
}