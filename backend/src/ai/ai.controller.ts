import { Body, Controller, Get, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatDto } from './dto/chat.dto';
import { DiagnoseDto } from './dto/diagnose.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Get('recommendations')
  recommendations() {
    return this.aiService.generateRecommendations();
  }

  @Post('chat')
  chat(@Body() dto: ChatDto) {
    return this.aiService.chat(dto.message);
  }

  @Post('diagnose')
  diagnose(@Body() dto: DiagnoseDto) {
    return this.aiService.diagnoseFromSymptoms(dto.symptoms);
  }
}
