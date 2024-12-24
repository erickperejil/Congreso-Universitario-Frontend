interface SelectFormProps {
    options: string[];
    id: string;
    iconName: string;
    legend: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}


const SelectForm = ({ options, id, iconName, legend, onChange }: SelectFormProps) => {
    return (
        <div className="bg-transparent border-[1px] border-[#ab9a9a] rounded-md flex items-center gap-2 pl-2 active:outline-none  text-base">
            <span className="material-symbols-outlined">{iconName}</span>
            <select id={id} name={id} className="bg-transparent w-full py-2 focus:outline-none" onChange={onChange}>
                <option hidden className="text-gray">
                    {legend}
                </option>
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