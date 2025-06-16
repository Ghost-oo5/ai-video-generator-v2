import React from "react";
import type { SuplimaxFormData } from "./types";
import { UseCase } from "./components/UseCaseSwitcher";

export interface SuplimaxFormData {
  features: string;
  tone: string;
  audience: string;
  videoStyle: string;
}

export interface RealEstateFormData {
  tourStyle: string;
}

export interface PropertyDetails {
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  features: string;
}
export interface RealEstateFormProps {
  formData: RealEstateFormData;
  onFormChange: (newData: RealEstateFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}
export interface MediaDisplayProps {
  title: string;
  imageUrl?: string | null;
  videoScript?: string | null;
  isLoading: boolean;
  altText?: string;
  showPlaceholder?: boolean;
  placeholderText?: string;
  downloadFileName?: string;
}
export interface ErrorMessageProps {
  message: string | null;
}
export interface LoadingSpinnerProps {
  message?: string;
}
export interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}
export interface DetailItemProps {
  label: string;
  value: string | number;
}
export interface SuplimaxFormProps {
  formData: SuplimaxFormData;
  onFormChange: (newData: SuplimaxFormData) => void;
  onSubmit: () => void;
  isLoading: boolean;
}
export interface UseCaseSwitcherProps {
  currentUseCase: UseCase;
  onUseCaseChange: (useCase: UseCase) => void;
}

