import { Body, Controller, Get, HttpCode, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientDTO } from './client.dto';

@Controller('client')
export class ClientAppController {
  constructor(@Inject('CLIENT_APP_SERVICE') private readonly client: ClientProxy) {}

  @Get()
  getAllBooks() {
    return this.client.send({ cmd: 'get_books' }, {});
  }

  @Get(':id')
  getBookByID(@Param('id') id) {
    return this.client.send({ cmd: 'get_book' }, id);
  }

  @Post()
  @HttpCode(200)
  createNewBook(@Body() book: ClientDTO) {
    console.log('book: ', book);
    return this.client.emit({ cmd: 'new_book' }, book);
  }
}
