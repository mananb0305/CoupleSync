import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: false })
    isCompleted: boolean;

    @Column({ nullable: true })
    assignedToId: string; // User ID of assignee

    @Column()
    coupleId: string; // Belongs to a couple

    @Column({ nullable: true })
    dueDate: Date;

    @Column({ default: 10 })
    points: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
