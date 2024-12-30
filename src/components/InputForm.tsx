const InputForm = ({ placeholder, iconName, type, id, value, onChange, onBlur }: InputFormInterface) => {
    return (
        <div className="bg-transparent border-[1px] border-[#ab9a9a] rounded-md flex items-center gap-2 pl-2 active:outline-none text-white text-base">
            <span className="material-symbols-outlined">{iconName}</span>
            <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange} 
                onBlur={onBlur}
                className="bg-transparent active:border-none placeholder:text-gray py-2 w-full focus:outline-none"
            />
        </div>
    );
};


interface InputFormInterface {
    placeholder: string;
    iconName: string;
    type: string;
    id: string;
    value?: string;
    onChange: (e: any) => void;
    onBlur?: (e: any) => void;
}

export default InputForm;