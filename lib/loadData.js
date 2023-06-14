export async function loadBookings() {

  const res = await fetch('/api/bookings')
  const data = await res.json()
 
  return data
}
export async function loadSettings() {

  const res = await fetch('/api/settings')
  const data = await res.json()
 
  return data
}
export async function loadServices() {

  const res = await fetch ('/api/services')
  const data = await res.json()
 
  return data
}

