"use client";

import { ReactNode } from "react";
import clsx from "clsx";

type ModalPosition =
  | "center"
  | "left"
  | "right"
  | "top"
  | "bottom";

type ModalSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "full";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;

  position?: ModalPosition;
  size?: ModalSize;

  className?: string; // extra tailwind if needed
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  position = "center",
  size = "md",
  className,
}: ModalProps) {
  if (!isOpen) return null;

  /* ---------- POSITION ---------- */
  const positionClasses: Record<ModalPosition, string> = {
    center: "items-center justify-center",
    left: "items-center justify-start",
    right: "items-center justify-end",
    top: "items-start justify-center",
    bottom: "items-end justify-center",
  };

  /* ---------- SIZE ---------- */
  const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "w-full h-full max-w-none rounded-none",
  };

  return (
    <div
      className={clsx(
        "fixed inset-0 z-50 flex",
        positionClasses[position]
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div
        className={clsx(
          "relative z-10 w-full bg-white p-6 shadow-lg",
          sizeClasses[size],
          position !== "center" && "h-full",
          className
        )}
      >
        {title && (
          <h2 className="mb-4 text-xl font-semibold">
            {title}
          </h2>
        )}

        {children}

        <button
          onClick={onClose}
          className="mt-6 rounded bg-red-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  );
}
