export async function loadBookings() {

  const res = await fetch('https://mitz-bookings.vercel.app/api/services')
  const data = await res.json()
 
  return data
}
export async function loadSettings() {

  const res = await fetch('https://mitz-bookings.vercel.app/api/settings')
  const data = await res.json()
 
  return data
}
export async function loadServices() {

  const res = await fetch ('https://mitz-bookings.vercel.app/api/services')
  const data = await res.json()
 
  return data
}

