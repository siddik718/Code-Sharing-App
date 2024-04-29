
const Button = ({ handleSubmit, style, actionText }) => {
    const helperText = actionText.toUpperCase();
    return <button className="px-8 py-1.5 rounded-sm bg-orange-400 hover:bg-orange-600 text-white font-mono" style={style} onClick={handleSubmit}>
        {helperText}
    </button>;
}

export default Button;