
const CustomInput = ({ type, name, placeholder, value, handleChange, err }) => {
    return (
        <div>
            <div className="border border-blue-300 mt-3 mx-4 mb-2 px-4 py-1 rounded">
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                />
            </div>

            <div className="mx-5 my-2">
                <p className="text-sm text-red-500">{err}</p>
            </div>
        </div>
    )
}

export default CustomInput;