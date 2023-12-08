import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('persons') 
export class People extends BaseEntity {
  @PrimaryGeneratedColumn()
  personId!: number;
    
  @Column({ type: 'varchar', length: 255, nullable: true })
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  faculty!: string;

  @Column({ type: 'int', nullable: true })
  semester!: number;

  
}
