import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Goal {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column({ default: 10 })
    points: number;

    @Column({ default: false })
    isRecurring: boolean;

    @Column({ nullable: true })
    reminderTime: string;

    @Column({ nullable: true })
    emoji: string;

    // Store completed dates as a simple array of strings for MVP (YYYY-MM-DD)
    @Column('simple-array', { nullable: true })
    completedDates: string[];

    @Column()
    userId: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
