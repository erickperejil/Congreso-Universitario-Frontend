import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotification } from '@/app/contexts/NotificationContext';
import Image from 'next/image';

export default function FloatingNotification() {
    const { isNotificationVisible, hideNotification } = useNotification();

    return (
        <AnimatePresence>
            {isNotificationVisible && (
                <motion.div
                    className="fixed top-4 right-4 bg-[#32378c] montserrat-font  text-white p-1 rounded-lg shadow-2xl w-96 z-50"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <div className='flex items-center justify-between items-start w-full rounded-lg border-[1px] border-[#F8B133] p-1'>
                        <div className="flex items-center gap-3">
                            <Image src="/logos/logo-unah-blanco-otro.webp" alt="Logo" className='w-[20%]' width={60} height={60} />
                            <span className="text-sm font-medium">
                                Por favor, verifica cuidadosamente la exactitud de tu información, ya que será utilizada en la generación de los certificados oficiales.
                            </span>

                        </div>
                        <button
                            onClick={hideNotification}
                            className="text-2xl font-semibold hover:text-gray-200 transition-colors duration-300 hover:scale-110"
                        >
                            &times; {/* La "X" de cerrar */}
                        </button>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
