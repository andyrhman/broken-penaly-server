import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateArticleDto {
    @IsString({ message: 'Nama lengkap harus string' })
    @IsNotEmpty({ message: "Nama lengkap tidak boleh kosong" })
    title: string;

    @IsString({ message: 'Deskripsi harus string' })
    @IsNotEmpty({ message: "Deskripsi tidak boleh kosong" })
    deskripsi_kecil: string;

    @IsString({ message: 'Konten harus string' })
    @IsNotEmpty({ message: "Konten tidak boleh kosong" })
    deskripsi_panjang: string;

    @IsString({ message: 'Estimasi baca harus string' })
    @IsNotEmpty({ message: "Estimasi baca tidak boleh kosong" })
    estimasi_membaca: string;

    @IsString({ message: 'Gambar harus string' })
    @IsNotEmpty({ message: "Gambar tidak boleh kosong" })
    gambar: string;

    @IsUUID('4', { message: 'Request tidak valid' })
    @IsNotEmpty({ message: "Tag tidak boleh kosong" })
    tag_id: string;
}