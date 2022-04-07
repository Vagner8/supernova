import { ReactElement } from "react"

interface Props {
  title: string
  input?: ReactElement
  img?: string
}

export function Point({ title, input, img }: Props) {
  return (
    <li className="collection-item avatar">
      {img ? <img src={img} alt="" className="circle" /> : null}
      <div>
        <p>{title}</p>
        {input ? input : null}
      </div>
    </li>
  )
}

Point.defaultProps = {
  title: 'name',
  img: 'https://ic.pics.livejournal.com/dubikvit/65747770/8083875/8083875_900.jpg',
  input: <input type="text" />
}