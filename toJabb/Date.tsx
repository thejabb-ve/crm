import { Inputs } from 'jabb-astro-components';

export default function Date({
  name,
  required,
  className,

  label,
  ...props
}: Inputs.Text) {
  return (
    <div>
      {label && (
        <Inputs.Label
          name={typeof label === 'string' ? label : label.text}
          htmlFor={name}
          className={typeof label === 'string' ? undefined : label.className}
          required={required}
        />
      )}
      <input
        name={name}
        id={name}
        type="date"
        required={required}
        className={`darkAltContainer text ${className}`}
        {...props}
      />
    </div>
  );
}
