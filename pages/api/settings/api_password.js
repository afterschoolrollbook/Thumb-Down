// pages/api/settings/password.js
// 관리자 비밀번호 변경 (KV에 해시 저장)

import { kv } from '@vercel/kv'
import { createHash } from 'crypto'

function sha256(str) {
  return createHash('sha256').update(str).digest('hex')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { currentPw, newPw } = req.body
  if (!currentPw || !newPw) return res.status(400).json({ error: '입력값 부족' })
  if (newPw.length < 6) return res.status(400).json({ error: '새 비밀번호는 6자 이상' })

  try {
    // KV에 저장된 해시 불러오기 (없으면 환경변수 기본값 사용)
    const storedHash = await kv.get('admin:password_hash')
    const defaultHash = sha256(process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin1234')
    const validHash = storedHash || defaultHash

    if (sha256(currentPw) !== validHash) {
      return res.status(401).json({ error: '현재 비밀번호가 틀렸습니다' })
    }

    // 새 비밀번호 해시 저장
    await kv.set('admin:password_hash', sha256(newPw))
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('KV password error:', err)
    res.status(500).json({ error: 'KV 저장 실패' })
  }
}
