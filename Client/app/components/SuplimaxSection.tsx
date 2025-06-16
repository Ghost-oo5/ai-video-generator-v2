import { SuplimaxForm } from './SuplimaxForm';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { useSuplimaxGenerator } from '@/app/hooks/useSuplimaxGenerator';
import { MediaDisplay } from './MediaDisplay';

export const SuplimaxSection = () => {
  const {
    form, setForm, imageUrl, videoScript, imagePrompt,
    isLoading, loadingMessage, error,
    submit
  } = useSuplimaxGenerator();

  return (
    <>
      <SuplimaxForm
        formData={form}
        onFormChange={setForm}
        onSubmit={submit}
        isLoading={isLoading}
      />
      {error && <ErrorMessage message={error} />}
      {isLoading && <LoadingSpinner message={loadingMessage} />}
  <MediaDisplay
        title="Suplimax Energy Drink Image"
        imageUrl={imageUrl}
        isLoading={isLoading && !imageUrl}
        altText={imagePrompt}
        showPlaceholder={!isLoading && !imageUrl && !videoScript}
        placeholderText="Generated Suplimax drink image will appear here."
      />
      <MediaDisplay
        title="Suplimax Marketing Video Script"
        videoScript={videoScript}
        isLoading={isLoading && imageUrl !== null && !videoScript}
        showPlaceholder={!isLoading && !videoScript && imageUrl !== null}
        placeholderText="Generated Suplimax marketing video script will appear here."
        downloadFileName="suplimax_video_script.txt"
      />
    </>
  );
};
