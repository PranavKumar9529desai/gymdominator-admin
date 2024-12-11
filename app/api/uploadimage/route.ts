// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server';
import uploadImage from '@/app/actions/clouldnary/UploadImageSA';

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();
    console.log('Received image:', image);

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const url = await uploadImage(image);
    return NextResponse.json({ msg: 'success', url });
  } catch (error) {
    console.error('Error in upload route:', error);
    return NextResponse.json({ msg: 'failed', error: 'Failed to upload image' }, { status: 500 });
  }
}

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '10mb', // Adjust the size limit as needed
//     },
//   },

// }