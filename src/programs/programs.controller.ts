import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { UpdateProgramDto } from './dto/update-program.dto';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Get()
  async listPrograms() {
    return this.programsService.findAll();
  }

  @Get(':id')
  async getProgram(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

  @Patch(':id')
  async updateProgram(
    @Param('id') id: string,
    @Body() dto: UpdateProgramDto,
  ) {
    // guard languages
    if (
      dto.languagesAvailable &&
      dto.languagePrimary &&
      !dto.languagesAvailable.includes(dto.languagePrimary)
    ) {
      throw new BadRequestException(
        'languagePrimary must be included in languagesAvailable',
      );
    }

    // posters validation
    const primaryPosters = dto.assets?.filter(
      (a) =>
        a.language === dto.languagePrimary && a.assetType === 'POSTER',
    );
    const hasPortrait = primaryPosters?.some(
      (a) => a.variant === 'PORTRAIT',
    );
    const hasLandscape = primaryPosters?.some(
      (a) => a.variant === 'LANDSCAPE',
    );

    if (!hasPortrait || !hasLandscape) {
      throw new BadRequestException(
        'Primary language must have portrait and landscape posters',
      );
    }

    return this.programsService.updateWithAssets(id, dto);
  }
}
