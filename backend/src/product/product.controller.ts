import { Body, Controller, Get, Post, Query, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { Express } from 'express';


@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }
    @Post('add')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: join(process.cwd(), '/src/images'), // โฟลเดอร์เก็บไฟล์ (ต้องสร้างโฟลเดอร์นี้ไว้)
                filename: (req, file, callback) => {
                    const ext = extname(file.originalname);
                    const sku = req.body.sku || 'unknown';  // ดึงจาก formData
                    const filename = `${sku}${ext}`;
                    callback(null, filename);
                },
            }),
            fileFilter: (req, file, callback) => {
                // ตรวจสอบไฟล์ภาพเท่านั้น
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    return callback(new Error('Only image files are allowed!'), false);
                }
                callback(null, true);
            },
        }),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() productDto: ProductDto,
    ) {
        console.log('Uploaded file info:', file);
        productDto.imgPath = file ? file.filename : null;
        console.log(join(process.cwd(), '/src/images'));

        return this.productService.addProduct(productDto);
    }


    @Get('getallproduct')
    getAllProduct(@Request() req) {
        return this.productService.getAllProduct();
    }

    @Get('getproduct')
    getProduct(@Query() query: any) {
        const q = query.q; // "name:Banana"

        if (q) {
            // แปลง q จาก string "name:Banana" เป็น { name: "Banana" }
            const filter: any = {};
            q.split(',').forEach(pair => {
                const [key, value] = pair.split(':').map(s => s.trim());
                if (key && value) {
                    filter[key] = value;
                }
            });
            console.log('filter:', filter);
            return this.productService.getProduct(filter);
        }
    }
}
