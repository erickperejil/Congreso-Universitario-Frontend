'use client';

import Button from "@/components/Button";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmAccount() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [isCodeValid, setIsCodeValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      e.target.value = value;
      if (value && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    } else {
      e.target.value = "";
    }
  };

  const handleSendCode = () => setIsCodeValid(true);
  const handleResendEmail = () => {
    // Lógica para reenviar el correo
  };

  return (
    <>
      {!isCodeValid ? (
        <ConfirmationScreen
          handleSendCode={handleSendCode}
          handleResendEmail={handleResendEmail}
          inputRefs={inputRefs}
          handleInputChange={handleInputChange}
        />
      ) : (
        <SuccessScreen router={router} />
      )}
    </>
  );
}

/** Subcomponentes */
function ConfirmationScreen({ handleSendCode, handleResendEmail, inputRefs, handleInputChange }: {
  handleSendCode: () => void;
  handleResendEmail: () => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}) {
  return (
    <>
      <h1 className="text-4xl font-semibold">Confirma tu cuenta</h1>
      <div className="flex flex-col gap-4 py-8 px-2 w-[80%] md:w-[70%] lg:w-3/5 justify-center items-center text-center">
        <p className="text-[#ab9a9a] mt-2">
          Hemos enviado un correo a{" "}
          <span className="text-white font-semibold">email</span>{" "}
          con un código para confirmar tu cuenta.
        </p>
        <InputFields inputRefs={inputRefs} handleInputChange={handleInputChange} />
        <div className="flex flex-col gap-2 w-full mt-8">
          <Button text="Confirmar" action={handleSendCode} variant="primary" styleType="fill" />
          <Button text="Reenviar correo" action={handleResendEmail} variant="secondary" styleType="outlined" />
        </div>
      </div>
    </>
  );
}

function SuccessScreen({ router }: { router: ReturnType<typeof useRouter> }) {
  return (
    <>
      <h1 className="text-4xl font-semibold">¡Cuenta confirmada!</h1>
      <div className="flex flex-col gap-4 py-8 px-2 w-[80%] md:w-[70%] lg:w-3/5 justify-center items-center text-center">
        <p className="text-[#ab9a9a]">Tu cuenta ha sido confirmada exitosamente. Inicia sesión para disfrutar de las conferencias.</p>
        <img src="/algo.gif" alt="Cuenta confirmada" className="w-1/5" />
        <Button text="Iniciar sesión" action={() => router.push("/login")} variant="primary" styleType="fill" />
      </div>
    </>
  );
}

function InputFields({ inputRefs, handleInputChange }: { 
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>; 
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void; 
}) {
  return (
    <div className="flex gap-4 mt-4 justify-between items-center w-full">
      {[...Array(4)].map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          maxLength={1}
          onChange={(e) => handleInputChange(e, index)}
          className="w-12 h-12 text-center text-white bg-transparent border border-[#ab9a9a] rounded-md focus:outline-none focus:ring-2 focus:ring-[#ab9a9a]"
        />
      ))}
    </div>
  );
}
