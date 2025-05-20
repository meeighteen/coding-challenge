export function isTokenValid() {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const payloadBase64 = token.split('.')[1]
    const payload = JSON.parse(atob(payloadBase64))
    const now = Date.now() / 1000
    return payload.exp > now
  } catch (e) {
    return false
  }
}