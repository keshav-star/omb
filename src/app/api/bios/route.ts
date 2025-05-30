import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured') === 'true';

    const bios = await prisma.bio.findMany({
      where: {
        ...(category && {
          categories: {
            some: {
              name: category,
            },
          },
        }),
        ...(featured && { featured: true }),
      },
      include: {
        categories: true,
      },
      orderBy: {
        popularity: 'desc',
      },
    });

    return NextResponse.json(bios);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch bios' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, summary, story, categories, image, audioUrl, videoUrl } = body;

    const bio = await prisma.bio.create({
      data: {
        name,
        summary,
        story,
        image,
        audioUrl,
        videoUrl,
        categories: {
          connect: categories.map((id: string) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    return NextResponse.json(bio, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create bio' },
      { status: 500 }
    );
  }
} 