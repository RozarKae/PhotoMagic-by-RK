import { NextRequest, NextResponse } from 'next/server';
import { upscalePhotoCloudAction } from '../../../actions/ai-inference-actions';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { image, scaleFactor = '4x', mode = 'portrait' } = body;

    if (!image) {
      return NextResponse.json({ success: false, error: 'Missing image input' }, { status: 400 });
    }

    const result = await upscalePhotoCloudAction(image, scaleFactor, mode);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Upscaling failed' },
      { status: 500 },
    );
  }
}
