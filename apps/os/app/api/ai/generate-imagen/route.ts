import { NextRequest, NextResponse } from 'next/server';
import { generateImageImagenAction } from '../../../actions/ai-inference-actions';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { prompt, aspectRatio = '4:3' } = body;

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Missing prompt text' }, { status: 400 });
    }

    const result = await generateImageImagenAction(prompt, aspectRatio);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Imagen generation failed' },
      { status: 500 },
    );
  }
}
