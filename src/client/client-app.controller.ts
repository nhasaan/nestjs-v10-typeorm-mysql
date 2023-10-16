import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ClientDTO } from './client.dto';

@Controller()
export class ClientAppController {
  constructor(
    @Inject('CLIENT_APP_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  getAllBooks() {
    return this.client.send({ cmd: 'get_books' }, {});
  }

  @Get(':id')
  getBookByID(@Param('id') id) {
    return this.client.send({ cmd: 'get_book' }, id);
  }

  @Post()
  createNewBook(@Body() book: ClientDTO) {
    return this.client.emit({ cmd: 'new_book' }, book);
  }
}
