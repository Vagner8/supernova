interface IconProps {
  icon: 'visibility' | 'visibility_off'
}

export function Icon({icon}: IconProps) {
  return <i className="material-icons">{icon}</i>
}