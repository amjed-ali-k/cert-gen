export const Info = ({
  id,
  date,
  reciptent,
  reciptentDescription,
  issuer,
  issuerDescription,
}: {
  id: string;
  date: string;
  reciptent: string;
  reciptentDescription: string;
  issuer: string;
  issuerDescription: string;
}) => {
  return (
    <div class="p-4 border-l h-full">
      <div>
        <h4 class="text-lg font-bold">Certificate Details</h4>
        <div>
          <p>Certificate ID: {id}</p>
          <p>Issued Date: {date}</p>
        </div>
        <div class="mt-3">
          <button className="px-4 mr-2 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Download
          </button>
          <button className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
            Copy link
          </button>
        </div>
      </div>
      <div>
        <h4 class="text-lg font-bold mt-6">Certificate Recipient</h4>
        <div>
          <p>{reciptent}</p>
          <p>{reciptentDescription}</p>
        </div>
      </div>
      <div>
        <h4 class="text-lg font-bold mt-6">Issued by</h4>
        <div>
          <p>{issuer}</p>
          <p>{issuerDescription}</p>
        </div>
      </div>
    </div>
  );
};
