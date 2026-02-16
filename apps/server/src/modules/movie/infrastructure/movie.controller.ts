import { Controller, Get } from '@nestjs/common';
import { GetMoviesUseCase } from '../application/use-cases/get-movies.use-case';

@Controller('movies')
export class MovieController {
    constructor(private readonly getMoviesUseCase: GetMoviesUseCase) { }

    @Get()
    async getMovies() {
        return this.getMoviesUseCase.execute();
    }
}
