import { callTestFunc } from "../lib";

export const Info = () => {
  return (
    <div class="p-4 border-l h-full">
      <div>
        <h4 class="text-lg font-bold">Certificate Details</h4>
        <div>
          <p>Certificate ID: 1234567890</p>
          <p>Issued Date: 12/12/2021</p>
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
          <p>Amjed Ali K</p>
          <p>Electronics Engineering - EL2025</p>
        </div>
      </div>
      <div>
        <h4 class="text-lg font-bold mt-6">Issued by</h4>
        <div>
          <p>Govt Polytechnic College</p>
          <p>Perinthalmanna</p>
        </div>
      </div>
    </div>
  );
};
