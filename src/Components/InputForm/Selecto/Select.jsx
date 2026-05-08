
export const Select = ({
    items = [],
    value,
    onChange,
    placeholder = "Selecciona una opción",
    name,
    optionLabel = "name",
    optionValue = "id",
    className = ""
}) => {

    return (

        <select
            name={name}
            value={value}
            onChange={onChange}
            className={`
                border
                p-2
                rounded-md
                w-full
                dark:bg-kanagawa-700
                ${className}
            `}
        >

            <option value="">
                {placeholder}
            </option>

            {items.map((item) => (

                <option
                    key={item[optionValue]}
                    value={item[optionValue]}
                >
                    {item[optionLabel]}
                </option>

            ))}

        </select>
    );
};

