export default function Avatar({ firstName, lastName }) {
  const initials = `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

  return <span className="avatar">{initials}</span>
}
