"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppIconProps {
  className?: string;
  size?: number;
}

export default function WhatsAppIcon({ className = "w-4 h-4", size }: WhatsAppIconProps) {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <FaWhatsapp size={size} />
    </span>
  );
}
