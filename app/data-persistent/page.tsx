import { readFile, writeFile } from "fs/promises";
import path from "path";

export default async function DataPersistent() {
  const data = await readFile(
    path.join(process.cwd(), "data", "pengecatan.json"),
    "utf-8",
  );

  console.log("Data dari file JSON:", data);
  const parsedData = JSON.parse(data);
  console.log("Data yang telah di-parse:", parsedData);
  parsedData.push({
    id: parsedData.length + 1,
    tanggal: new Date().toISOString(),
    panjang: 10,
    lebar: 5,
    tinggi: 2,
    caraPembayaran: "tunai",
    hargaCat: 100000,
    biayaTenagaKerja: 50000,
    totalBiaya: 150000,
  });
  console.log("Data yang sudah di-parse:", parsedData);

  const updatedData = JSON.stringify(parsedData, null, 2);
  await writeFile(
    path.join(process.cwd(), "data", "pengecatan.json"),
    updatedData,
    "utf-8",
  );
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Persistent</h1>
      <pre>{JSON.stringify(parsedData, null, 2)}</pre>
    </div>
  );
}
