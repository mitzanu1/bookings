export async function loadBookings() {

  const res = await fetch('http://localhost:3000/api/bookings')
  const data = await res.json()
 
  return data
}
export async function loadSettings() {

  const res = await fetch('http://localhost:3000/api/settings')
  const data = await res.json()
 
  return data
}
export async function loadServices() {

  const res = await fetch ('http://localhost:3000/api/services')
  const data = await res.json()
 
  return data
}

