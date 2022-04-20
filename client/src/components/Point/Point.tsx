import { TextInput } from '../Inputs/TextInput';

interface Props {
  value: string;
  name?: string;
  img?: string | null;
  editMode: boolean;
}

export function Point({
  value, name, img, editMode,
}: Props) {
  if (editMode) {
    return <TextInput name={name} initialValue={value} />;
  }
  return (
    <>
      {img ? <img src={img} alt="Avatar" className="circle" /> : null}
      <div>
        {name ? (
          <p>
            {name}
            :
            {' '}
            {value}
          </p>
        ) : (
          value
        )}
      </div>
    </>
  );
}

Point.defaultProps = {
  img: '',
  name: '',
};
