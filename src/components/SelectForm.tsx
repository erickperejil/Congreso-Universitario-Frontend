const SelectForm = ({ options, id, iconName }: { options: string[]; id: string; iconName: string }) => {
    return (
        <div className="bg-transparent border-2 border-[#ab9a9a] rounded-md flex items-center gap-2 pl-2 active:outline-none text-white text-base bg-white">
            <span className="material-symbols-outlined">{iconName}</span>
            <select id={id} name={id} className="bg-transparent w-full py-2 focus:outline-none">
                {options.map((option, index) => (
                    <option key={index} value={option} className="text-black">
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectForm;