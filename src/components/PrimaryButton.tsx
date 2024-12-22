'use client'

interface PrimaryButtonProps {
    text: string;
    action: () => void;
}

const PrimaryButton = ({ text, action }: PrimaryButtonProps) => {
    return <button
        className="px-4 py-2 text-sm capitalize rounded-md border border-[#F8B133] hover:bg-[#F8B133] hover:text-[#101017] transition-all w-max" onClick={action} >
        {text} </button>
}

export default PrimaryButton;
