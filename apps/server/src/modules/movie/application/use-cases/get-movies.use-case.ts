import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@rophim/database';
import { Movie } from '../../domain/movie.entity';

@Injectable()
export class GetMoviesUseCase {
    private prisma = new PrismaClient();

    async execute(): Promise<Movie[]> {
        const moviesData = await this.prisma.movie.findMany({
            orderBy: { createdAt: 'desc' },
        });

        return moviesData.map(
            (m) =>
                new Movie(
                    m.id,
                    m.title,
                    m.slug,
                    m.description || undefined,
                    m.posterUrl || undefined,
                    m.backdropUrl || undefined,
                    m.releaseYear || undefined,
                    m.imdbRating || undefined,
                ),
        );
    }
}
