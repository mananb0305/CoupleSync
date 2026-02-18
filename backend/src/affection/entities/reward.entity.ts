import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';

@Entity()
export class Reward {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    type: string; // 'heart', 'kiss', 'hug', 'custom'

    @Column({ nullable: true })
    message: string;

    @Column({ default: 0 })
    points: number;

    @Column()
    senderId: string;

    @Column()
    receiverId: string;

    @Column()
    coupleId: string;

    @CreateDateColumn()
    createdAt: Date;
}
