export const CertificateViewer = async ({id}: {id: string}) => {
  return (
    <div class="p-3 col-span-4 md:col-span-3">
      <div class="border-4 p-2 md:p-4">
        <div class="h-fit w-full">
          <img class="w-full" src={`https://cert-image.amjedmgm.workers.dev/cert/${id}/image.svg`} />
        </div>
      </div>
    </div>
  );
};
