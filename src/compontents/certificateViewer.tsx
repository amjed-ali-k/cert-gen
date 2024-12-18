export const CertificateViewer = async ({id}: {id: string}) => {
  return (
    <div class="p-3 col-span-3">
      <div class="border-4 p-4">
        <div class="h-fit">
          <img src={`/cert/${id}/image.svg`} />
        </div>
      </div>
    </div>
  );
};
