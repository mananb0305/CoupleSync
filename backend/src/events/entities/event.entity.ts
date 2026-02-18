import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column({ nullable: true })
    description: string;

    @Column()
    startDate: Date;

    @Column({ nullable: true })
    endDate: Date;

    @Column({ default: false })
    isAllDay: boolean;

    @Column({ nullable: true })
    location: string;

    @Column()
    coupleId: string;

    @Column({ nullable: true })
    createdByUserId: string;

    @Column({ nullable: true })
    category: string; // 'date_night', 'anniversary', 'general'

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
