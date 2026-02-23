/* eslint-disable react/prop-types */
import "./index.css"

const Input = ({
    label = '',
    name,
    defaultValue = '',
    type = 'text',
    disabled = false,
    placeholder,
    register,
    required = true,
    errors,
    value,
    onChange,
    colorClass
}) => {
    return (
        <div className="w-full">
            <label className='input-label'>
                {label}
            </label>
            <input
                type={type}
                name={name}
                disabled={disabled}
                defaultValue={defaultValue}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                // className='input-field input-select-field'
                className={`
                    w-full px-3 py-2 border rounded outline-none  transition-all duration-200 text-base font-normal border-[#444449] [transition:0.5s] ease-in-out focus:
                    shadow-xl focus:border-[#ff6b00] focus:ring-[.5px]
                    ${colorClass}
                    ${errors && errors[name] ? "border-red-600  " : " focus:ring-[1px]"}
                    `}
                {...register(name, { required: required })}
            />
            <div className="error-text flex items-center justify-end relative capitalize mt-1">
                {
                    errors && errors[name] && <span>{label || name || 'this'} is required
                        <span>
                            <img className="w-5 h-5 absolute -top-8 right-5" src="https://i.postimg.cc/rwxT9jXz/exclamation-mark.webp" alt="error-logo" />
                        </span>
                    </span>
                }
            </div>
        </div>
    );
};

export default Input;