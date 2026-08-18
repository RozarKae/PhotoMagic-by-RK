import { NextRequest, NextResponse } from 'next/server';
import { removeBackgroundCloudAction } from '../../../actions/ai-inference-actions';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { image } = body;

    if (!image) {
      return NextResponse.json({ success: false, error: 'Missing image input' }, { status: 400 });
    }

    const result = await removeBackgroundCloudAction(image);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Background removal failed' },
      { status: 500 },
    );
  }
}
