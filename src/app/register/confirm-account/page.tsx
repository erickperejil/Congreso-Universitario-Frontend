'use client';

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Button from "@/components/Button";
import InputFields from "@/components/InputCodeForm";
import SuccessScreen from "@/components/SuccesScreenForms";

import { verifyUser, resendVerificationEmail } from "./actionts";

export default function ConfirmAccount() {
  const [email, setEmail] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);

  // Recuperar el correo almacenado en localStorage
  useEffect(() => {

    const email = localStorage.getItem('registerEmail');

    if (email) {
      setEmail(email);
    } else {
      console.error('Correo no encontrado. Redirigiendo...');
      router.push('/register');
    }
  }, []);

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

  const handleSendCode = async () => {
    setSendingCode(true);
    const errorElement = document.getElementById('error-paragraph');
    if (errorElement) {
      errorElement.classList.remove('shake');
      void errorElement.offsetWidth;
    }

    // Recorre los inputs y valida si están vacíos
    for (const input of inputRefs.current) {
      if (input?.value === "") {
        if (errorElement) {
          errorElement.classList.add('shake');
        }
        setError("Por favor, ingresa el código completo");
        input?.focus();
        setSendingCode(false);
        return;
      }
    }

    setError("");

    // Obtiene el código ingresado
    const code = inputRefs.current.map((input) => input?.value).join("");
    console.log('Código ingresado:', code);

    // Valida si el correo está presente
    if (!email) {
      setError("Error al identificar el correo. Por favor, intenta de nuevo");
      return; // Detiene la ejecución
    }

    try {
      // Envía la petición para verificar el código
      const response = await verifyUser(email, code);
      if ('error' in response) {
        console.error('Error al verificar el código:', response.error);
        setError("El código ingresado es incorrecto o ha expirado.");
        return;
      }

      // Limpia el almacenamiento local y marca el código como válido
      localStorage.removeItem('registerEmail');
      setIsCodeValid(true);

    } catch (error) {
      console.error('Error inesperado:', error);
      setError("Ocurrió un error al verificar el código. Por favor, intenta de nuevo.");
    } finally {
      setSendingCode(false);
    }
  };


  const handleResendEmail = () => {
    console.log('Reenviando correo...');
    if (sendingCode) {
      return;
    }

    setSendingCode(true);
    resendVerificationEmail(email)
      .then((response) => {
        if ('error' in response) {
          console.error('Error al reenviar el correo:', response.error);
          setError("Ocurrió un error al reenviar el correo. Por favor, intenta de nuevo.");
          return;
        }

        localStorage.setItem('timerEndTime', new Date().getTime().toString());
        setError("El correo ha sido reenviado exitosamente.");
      })
      .catch((error) => {
        console.error('Error inesperado:', error);
        setError("Ocurrió un error al reenviar el correo. Por favor, intenta de nuevo.");
      })
      .finally(() => setSendingCode(false));

  };

  return (
    <>
      {!isCodeValid ? (
        <ConfirmationScreen
          handleSendCode={handleSendCode}
          handleResendEmail={handleResendEmail}
          inputRefs={inputRefs}
          handleInputChange={handleInputChange}
          email={email}
          error={error}
          sending={sendingCode}
        />
      ) : (
        <SuccessScreen
          title="¡Cuenta confirmada!"
          comment="Tu cuenta ha sido confirmada exitosamente. Inicia sesión para disfrutar de las conferencias."
          buttonTitle="Iniciar sesión"
          redirectionRoute="/login"
          router={router}
        />
      )}
    </>
  );
}

/** Subcomponentes */

function ConfirmationScreen({ handleSendCode, handleResendEmail, inputRefs, handleInputChange, email, error, sending }: {
  handleSendCode: () => void;
  handleResendEmail: () => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  email: string;
  error?: string;
  sending?: boolean;
}) {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const timerEndTime = localStorage.getItem("timerEndTime");
    const now = new Date().getTime();

    if (timerEndTime && parseInt(timerEndTime) > now) {
      setTimeLeft(Math.floor((parseInt(timerEndTime) - now) / 1000));
    } else {
      const newEndTime = now + 10 * 60 * 1000; // 10 minutos
      localStorage.setItem("timerEndTime", newEndTime.toString());
      setTimeLeft(10 * 60);
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleResendEmailF = () => {
    handleResendEmail();
    /* Reiniciar cronometro */
    const now = new Date().getTime();
    const newEndTime = now + 10 * 60 * 1000; // 10 minutos
    localStorage.setItem("timerEndTime", newEndTime.toString());
    setTimeLeft(10 * 60);
  }



  return (
    <>
      <h1 className="text-4xl font-semibold">Confirma tu cuenta</h1>
      <div className="flex flex-col gap-4 py-8 px-2 w-[80%] md:w-[70%] lg:w-3/5 justify-center items-center text-center">
        <p className="text-[#ab9a9a] mt-2">
          Hemos enviado un correo a
          <span className="text-white font-semibold"> {email}</span>{" "}
          con un código para confirmar tu cuenta. Por favor ingrésalo a continuación.
        </p>
        <p className="text-[#ab9a9a]">Si no lo encuentras revisa la bandeja de spam.</p>
        <div className="text-white font-semibold text-xl">
          {timeLeft > 0 ? `Tiempo restante: ${formatTime(timeLeft)}` : "El tiempo ha expirado. Reenvía el correo."}
        </div>
        <InputFields inputRefs={inputRefs} handleInputChange={handleInputChange} />
        {error && <p className="text-[#F8B133] shake" id="error-paragraph">{error}</p>}
        <div className="flex flex-col gap-2 w-full mt-8">
          <Button text="Confirmar" action={handleSendCode} variant="primary" styleType="fill" disabled={sending || timeLeft === 0} />
          <Button text="Reenviar correo" action={handleResendEmailF} variant="secondary" styleType="outlined" disabled={sending} />
        </div>

        <p className="text-sm text-white text-center">
          Ya tengo cuenta,{" "}
          <Link
            href="/login"
            className="text-[#f8b133] underline underline-offset-4"
          >
            Iniciar Sesión
          </Link>
        </p>      </div>
    </>
  );
}
