import React, { useEffect } from "react";

type NotificationType = "success" | "info" | "warning";

const NotificationCard = ({ type = "success", msg }: { type?: NotificationType; msg: string }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const notificationElement = document.querySelector(".animate-slideIn");
      if (notificationElement) {
        notificationElement.classList.add("animate-slideOut");
        setTimeout(() => {
          notificationElement.remove();
        }, 300);
      }
    }, 4000);

    return () => clearTimeout(timeout); // Limpia el temporizador al desmontar el componente
  }, []);

  // Estilos según el tipo de notificación
  const typeStyles = {
    success: {
      bgColor: "bg-green-500",
      textColor: "text-green-500",
      icon: (
        <svg
          className="w-6 h-6 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM17.3334 28.3333L8.33337 19.3333L10.7667 16.9L17.3334 23.4666L29.2334 11.5666L31.6667 14L17.3334 28.3333Z" />
        </svg>
      ),
    },
    info: {
      bgColor: "bg-blue-500",
      textColor: "text-blue-500",
      icon: (
        <svg
          className="w-6 h-6 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>
      ),
    },
    warning: {
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-500",
      icon: (
        <svg
          className="w-6 h-6 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
        >
          <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM18.3334 11.6666H21.6667V21.6666H18.3334V11.6666ZM18.3334 25H21.6667V28.3333H18.3334V25Z" />
        </svg>
      ),
    },
  };

  const { bgColor, textColor, icon } = typeStyles[type];

  return (
    <div
      className={`fixed top-5 right-5 w-full max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 transition-all transform animate-slideIn z-50 flex overflow-hidden`}
    >
      <div className={`flex items-center justify-center w-12 ${bgColor}`}>
        {icon}
      </div>

      <div className="px-4 py-2 -mx-3 flex-1">
        <div className="mx-3">
          <span className={`font-semibold ${textColor} dark:${textColor}`}>{type.toUpperCase()}</span>
          <p className="text-sm text-gray-600 dark:text-gray-200">{msg}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
