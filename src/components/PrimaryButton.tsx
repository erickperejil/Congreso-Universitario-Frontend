'use client'

interface PrimaryButtonProps {
    text: string;
    action: () => void;
    children?: React.ReactNode;
    className?: string;
    type: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
}

const PrimaryButton = ({ text, action, children, className, type }: PrimaryButtonProps) => {

    const typeButtons = {
        primary: "bg-[#F8B133] text-[#101017]",
        secondary: "bg-[#e7e8f2] text-[#000]",
        danger: "bg-[#FF0000] text-[#101017]",
        success: "bg-[#00FF00] text-[#101017]",
        warning: "bg-[#FFFF00] text-[#101017]",
        info: "bg-[#0000FF] text-[#101017]",
        light: "bg-[#FFFFFF] text-[#101017]",
        dark: "bg-[#000000] text-[#FFFFFF]"
    }

    return <button
        className={`flex justify-center items-center gap-1 px-4 py-2 text-sm capitalize rounded-md hover:bg-[#F8B133] hover:text-[#101017] transition-all font-semibold hover:bg-[#fff] hover:text-black ${className} ${typeButtons[type]}`} onClick={action}  >
        {children}  {text} </button>
}

export default PrimaryButton;
