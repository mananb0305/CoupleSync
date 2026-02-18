import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Couple {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'user1Id' })
    user1Id: string;

    @Column({ name: 'user2Id', nullable: true })
    user2Id: string;

    @Column({ nullable: true })
    anniversaryDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
