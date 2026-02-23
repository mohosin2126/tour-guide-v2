const Textarea = ({
    label = '',
    name,
    defaultValue = '',
    disabled = false,
    placeholder,
    register,
    required = true,
    errors,
    value,
    onChange,
    className
}) => {
    return (
        <div className="w-full georama">
            <label className='text-base font-normal !text-white'>
                {label}
            </label>
            <textarea
                name={name}
                disabled={disabled}
                defaultValue={defaultValue}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                rows='5'
                className={`
                    w-full px-3 !text-[#B8B8B8] py-2 border-[1px] mt-2 border-[#444449] rounded outline-none [transition:0.5s] ease-in-out focus:
                    shadow-xl text-base font-normal focus:border-[#ff6b00] focus:ring-[.5px]
                    ${className}
                    ${errors && errors[name] ? "border-red-600 " : " focus:ring-[1px]"}
                `}
                {...register(name, { required: required })}
            />
            <p className="text-start text-red-500 mt-[2px] capitalize">
                {errors && errors[name] && <span>{label || name || 'This field'} is required</span>}
            </p>
        </div>
    );
};

export default Textarea;