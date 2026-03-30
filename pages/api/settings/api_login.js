// pages/api/settings/login.js
// 로그인 검증 → 성공 시 ADMIN_SECRET_TOKEN 반환
// 이 토큰을 이후 save API 호출 시 헤더에 담아 보냄

import { kv } from '@vercel/kv'
import { createHash } from 'crypto'

function sha256(str) {
  return createHash('sha256').update(str).digest('hex')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { password } = req.body
  if (!password) return res.status(400).json({ error: '비밀번호 입력 필요' })

  try {
    const storedHash = await kv.get('admin:password_hash')
    const defaultHash = sha256(process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin1234')
    const validHash = storedHash || defaultHash

    if (sha256(password) !== validHash) {
      return res.status(401).json({ error: '비밀번호가 틀렸습니다' })
    }

    // 로그인 성공 → 서버사이드 시크릿 토큰 반환
    res.status(200).json({ token: process.env.ADMIN_SECRET_TOKEN })
  } catch (err) {
    console.error('KV login error:', err)
    res.status(500).json({ error: '서버 오류' })
  }
}
