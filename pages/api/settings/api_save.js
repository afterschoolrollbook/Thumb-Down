// pages/api/settings/save.js
// Vercel KV에 설정값 저장 (관리자만 호출 가능)

import { kv } from '@vercel/kv'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  // 관리자 토큰 검증
  const token = req.headers['x-admin-token']
  const validToken = process.env.ADMIN_SECRET_TOKEN
  if (!validToken || token !== validToken) {
    return res.status(401).json({ error: '인증 실패' })
  }

  const { cooldown, adsOn, affiliateLinks, affiliateEnabled } = req.body

  try {
    const ops = []
    if (cooldown !== undefined)        ops.push(kv.set('site:cooldown', cooldown))
    if (adsOn !== undefined)           ops.push(kv.set('site:ads_on', adsOn))
    if (affiliateLinks !== undefined)  ops.push(kv.set('affiliate:links', affiliateLinks))
    if (affiliateEnabled !== undefined) ops.push(kv.set('affiliate:enabled', affiliateEnabled))
    await Promise.all(ops)

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('KV save error:', err)
    res.status(500).json({ error: 'KV 저장 실패' })
  }
}
