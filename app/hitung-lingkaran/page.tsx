import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="p-4 text-2x1 font-bold text-blue-800 border-2 border-b-indigo-700 ">
        Pemograman Website - Pertemuan 3
      </div>
      <div className="border-2 border-red-600 rounded-lg p-4">
        <h1 className="text-xl font bold">Kalkulasi Lingkaran</h1>
        <div className="flex flex-row gap-3 items-center pl-3">
          <p className="mt-2 mb-2">Berapa radius lingkaran</p>
          <input
            className="mb-2"
            type="number"
            placeholder="Masukkan Radius Lingkaran"
          />
        </div>
        <Button>Hitunglah LUAS dan KELILING Lingkaran</Button>
      </div>
    </div>
  );
};
export default Page;
