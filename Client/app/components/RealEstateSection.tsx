import { useRealEstateGenerator } from "@/app/hooks/useRealEstateGenerator";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";
import { RealEstateForm } from "./RealEstateForm";
import { MediaDisplay } from "./MediaDisplay";

export const RealEstateSection = () => {
  const {
    form,
    setForm,
    isLoading,
    loadingMessage,
    error,
    submit,
    videoScript,
  } = useRealEstateGenerator();

  return (
    <>
      <RealEstateForm
        formData={form}
        onFormChange={setForm}
        onSubmit={submit}
        isLoading={isLoading}
      />
      {error && <ErrorMessage message={error} />}
      {isLoading && <LoadingSpinner message={loadingMessage} />}
      <MediaDisplay
        title="Real Estate Video Tour Script"
        videoScript={videoScript}
        isLoading={isLoading && !videoScript}
        showPlaceholder={!isLoading && !videoScript}
        placeholderText="Generated real estate video tour script will appear here."
        downloadFileName="real_estate_tour_script.txt"
      />
    </>
  );
};
