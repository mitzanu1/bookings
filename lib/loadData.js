export async function loadBookings() {

  const res = await fetch('https://bookings-orcin.vercel.app/api/bookings')
  const data = await res.json()
 
  return data
}
export async function loadSettings() {

  const res = await fetch('https://bookings-orcin.vercel.app/api/settings')
  const data = await res.json()
 
  return data
}
export async function loadServices() {

  const res = await fetch ('https://bookings-orcin.vercel.app/api/services')
  const data = await res.json()
 
  return data
}

