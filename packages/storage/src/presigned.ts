import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client } from './r2-client';

export interface PresignedUrlOptions {
  bucket: string;
  key: string;
  contentType?: string;
  expiresInSeconds?: number;
}

export async function generatePresignedUploadUrl({
  bucket,
  key,
  contentType = 'image/webp',
  expiresInSeconds = 900, // 15 Minutes
}: PresignedUrlOptions): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: key,
    ContentType: contentType,
  });

  return await getSignedUrl(r2Client, command, { expiresIn: expiresInSeconds });
}

export async function generatePresignedDownloadUrl({
  bucket,
  key,
  expiresInSeconds = 3600, // 1 Hour
}: PresignedUrlOptions): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  return await getSignedUrl(r2Client, command, { expiresIn: expiresInSeconds });
}
