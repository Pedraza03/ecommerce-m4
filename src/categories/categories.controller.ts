import { Controller, Get, UseGuards} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('CATEGORIES')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get()
  getCategories(){
    return this.categoriesService.getCategories()
  }

  @ApiBearerAuth()
  @Get('seeder')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  addCategories(){
    return this.categoriesService.addCategories()
  }
}
