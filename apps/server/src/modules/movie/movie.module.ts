import { Module } from '@nestjs/common';
import { GetMoviesUseCase } from './application/use-cases/get-movies.use-case';
import { MovieController } from './infrastructure/movie.controller';

@Module({
    controllers: [MovieController],
    providers: [GetMoviesUseCase],
    exports: [GetMoviesUseCase],
})
export class MovieModule { }
