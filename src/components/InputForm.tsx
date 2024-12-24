
interface InputFormInterface {
    placeholder: string;
    iconName: string;
    type: string;
    id: string;
}


const InputForm = ({placeholder, iconName, type, id} : InputFormInterface) => {
    return (
        <div className="bg-transparent border-2 border-[#ab9a9a] rounded-md flex items-center gap-2 pl-2 active:outline-none text-white text-base bg-white">
        <span className="material-symbols-outlined">{iconName}</span>
        <input type={type} id={id} name={id} required placeholder={placeholder}className="bg-transparent active:border-none placeholder:text-gray py-2 w-full focus:outline-none"/>
    </div>
    )
}

export default InputForm;