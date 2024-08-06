import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('FILES')
@Controller('files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiBearerAuth()
  @Put('uploadImage/:id')
  @ApiOperation({ summary: 'Upload an image for a product' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  uploadImage(
    @Param('id') productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'El tamaño máximo del archivo es de 200Kb',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      })
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }

}
