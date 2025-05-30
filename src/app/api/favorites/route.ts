import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId,
      },
      include: {
        bio: {
          include: {
            categories: true,
          },
        },
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, bioId } = body;

    const favorite = await prisma.favorite.create({
      data: {
        userId,
        bioId,
      },
      include: {
        bio: {
          include: {
            categories: true,
          },
        },
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create favorite' },
      { status: 500 }
    );
  }
} 