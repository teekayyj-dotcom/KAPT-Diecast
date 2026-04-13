const ADMIN_EMAILS = new Set(['teekayyj@gmail.com'])

export const getUserRole = (user) => {
  const email = user?.email?.trim().toLowerCase()

  if (email && ADMIN_EMAILS.has(email)) {
    return 'admin'
  }

  return 'customer'
}

export const isAdminUser = (user) => getUserRole(user) === 'admin'

