export async function loadBookings() {

  const res = await fetch('https://vercel.com/mitzanu1/bookings//api/bookings')
  const data = await res.json()
 
  return data
}
export async function loadSettings() {

  const res = await fetch('https://vercel.com/mitzanu1/bookings//api/settings')
  const data = await res.json()
 
  return data
}
export async function loadServices() {

  const res = await fetch ('https://vercel.com/mitzanu1/bookings//api/services')
  const data = await res.json()
 
  return data
}

