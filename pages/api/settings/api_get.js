// pages/api/settings/get.js
// Vercel KV에서 설정값 읽기
//
// 설치 필요: npm install @vercel/kv
// Vercel 대시보드: Storage → Create KV → 프로젝트에 연결

import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const [cooldown, adsOn, affiliateLinks, affiliateEnabled] = await Promise.all([
      kv.get('site:cooldown'),
      kv.get('site:ads_on'),
      kv.get('affiliate:links'),
      kv.get('affiliate:enabled'),
    ])

    res.status(200).json({
      cooldown: cooldown ?? 12,
      adsOn: adsOn ?? true,
      affiliateLinks: affiliateLinks ?? {
        tubebuddy:     'https://www.tubebuddy.com/pricing?a=YOUR_ID',
        canva:         'https://partner.canva.com/YOUR_ID',
        envato:        'https://elements.envato.com/?ref=YOUR_ID',
        vidiq:         'https://vidiq.com/#_YOUR_ID',
        epidemicSound: 'https://www.epidemicsound.com/?utm_source=affiliate&utm_medium=YOUR_ID',
      },
      affiliateEnabled: affiliateEnabled ?? {
        tubebuddy: true,
        canva: true,
        envato: true,
        vidiq: true,
        epidemicSound: false,
      },
    })
  } catch (err) {
    console.error('KV get error:', err)
    res.status(500).json({ error: 'KV 읽기 실패' })
  }
}
