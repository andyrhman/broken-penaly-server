import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Tag } from "./tag.entity";
import { Komentar } from "./komentar.entity";
import { ArticlePublish } from "./article-publish.entity";
import { Likes } from "./article-like.entity";

@Entity('artikel')
export class Article {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column()
    deskripsi_kecil: string;

    @Column({ type: 'text' })
    deskripsi_panjang: string;

    @Column()
    estimasi_membaca: string;

    @Column()
    gambar: string;

    @CreateDateColumn()
    dibuat_pada: string;

    @Column({ name: "penulis" })
    penulis: string;

    @Column({ name: "tag_id" })
    tag_id: string;

    @ManyToOne(() => User, user => user.article)
    @JoinColumn({ name: 'penulis' })
    user: User;

    @ManyToOne(() => Tag, tag => tag.article)
    @JoinColumn({name: "tag_id"})
    tag: Tag;

    @OneToMany(() => Komentar, (komentar) => komentar.article)
    komentar: Komentar[];

    @OneToMany(() => ArticlePublish, (status_publish) => status_publish.article)
    status_publish: ArticlePublish[];

    @OneToMany(() => Likes, (likes) => likes.article)
    likes: Likes[];
}