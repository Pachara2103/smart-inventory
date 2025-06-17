import { Body, Controller, Get, Post, Query, Request, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { AnyTxtRecord } from 'dns';


@Controller('product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
    ) { }
    @Post('creat')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: join(process.cwd(), '/images'), // โฟลเดอร์เก็บไฟล์ (ต้องสร้างโฟลเดอร์นี้ไว้)
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
        // console.log('Uploaded file info:', file.filename);
        productDto.imgPath = file ? file.filename : null;

        return this.productService.creatProduct(productDto);
    }

    @Get('getallproduct')
    getAllProduct(@Request() req) {
        return this.productService.getAllProduct();
    }
    
    @Get('getallcategory')
    AllCategory(@Request() req) {
        return this.productService.getAllCategory();
    }

     @Get('getallhistory')
    getAllHistory(@Request() req) {
        return this.productService.getAllHistory();
    }

    @Get('getproduct')
    getProduct(@Query() q: any) {
        return this.productService.getProduct(q);
    }
     @Get('gethistoryproduct')
    getHistoryProduct(@Query() q: any) {
        return this.productService.getHistoryProduct(q);
    }

    @Get('sortproduct')
    async sortProduct(@Query('sortType') sortType: string, @Query('asc') asc: string) {
        // console.log(sortType, asc);
        const Asc = asc === "true" ? true : false;
        return this.productService.sortType(sortType, Asc);
    }

    @Get('selectcategory')
    async selectCategory(@Query('category') category: string) {
        return this.productService.selectCategory(category);
    }
    @Get('sale')
    async saleProduct(@Query() r: any) {
        return this.productService.getSaleProduct();
    }

    @Get('sale/selectcategory')
    async getsaleProduct(@Query() q: any) {
        return this.productService.saleSelectCategory(q.category);
    }

    @Post('add')
    async addQuantity(@Body() body: { sku: string; amount: number; description: string, user: string }) {
        console.log(body);

        return { msg: 'add successfully', add: await this.productService.updateQuantity(body.sku, body.amount, body.description, "Add", body.user) };
    }

    @Post('req')
    async reqProduct(@Body() body: { sku: string; amount: number; description: string, user: string }) {
        console.log('req', body);

        return { msg: 'req successfully', req: await this.productService.updateQuantity(body.sku, body.amount, body.description, "Req", body.user) };
    }
}
