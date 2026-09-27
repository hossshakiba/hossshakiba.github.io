import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const dynamic = 'force-static';

const size = { width: 1200, height: 630 };

export async function GET() {
  const portrait = await readFile(join(process.cwd(), 'src/app/_og/portrait.jpg'));
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          padding: '0 84px',
          background: 'linear-gradient(135deg, #0b1119 0%, #121b26 55%, #17263a 100%)',
          color: '#f2f7ff',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: 'radial-gradient(circle, rgba(143,183,226,0.28) 0%, rgba(143,183,226,0) 70%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            padding: 8,
            borderRadius: 36,
            background: 'linear-gradient(145deg, #8fb7e2, #355b84)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.45)',
          }}
        >
          <img src={portraitSrc} width={300} height={300} style={{ borderRadius: 30, objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 64, flex: 1 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            Hossein Shakibania
          </div>
          <div style={{ fontSize: 32, color: '#c9d6e6', marginTop: 24, lineHeight: 1.3 }}>
            MS Student in AI & Machine Learning
          </div>
          <div style={{ fontSize: 28, color: '#8fb7e2', marginTop: 8, lineHeight: 1.3 }}>
            Technical University of Darmstadt
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 40,
              fontSize: 24,
              color: '#0d131b',
              background: '#8fb7e2',
              padding: '8px 18px',
              borderRadius: 12,
              alignSelf: 'flex-start',
            }}
          >
            hossshakiba.github.io
          </div>
        </div>
      </div>
    ),
    size
  );
}
