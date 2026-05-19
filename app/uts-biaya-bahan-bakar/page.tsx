"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import z from "zod";
import { useForm } from "@tanstack/react-form";

// Validasi formulir menggunakan zod untuk memastikan input valid dan positif
const formSchema = z.object({
  konsumsiBBM: z
    .string()
    .min(1, "Rata-rata pemakaian bahan bakar harus diisi")
    .regex(
      /^\d+(\.\d+)?$/,
      "Rata-rata pemakaian bahan bakar harus berupa angka positif",
    )
    .regex(
      /^(?!0+(\.0)?$).+$/,
      "Rata-rata pemakaian bahan bakar harus lebih besar dari nol",
    )
    .transform(Number),
  jarakPerjalanan: z
    .string()
    .min(1, "Rencana jarak perjalanan harus diisi")
    .regex(
      /^\d+(\.\d+)?$/,
      "Rencana jarak perjalanan harus berupa angka positif",
    )
    .regex(
      /^(?!0+(\.0)?$).+$/,
      "Rencana jarak perjalanan harus lebih besar dari nol",
    )
    .transform(Number),
  hargaBBM: z
    .string()
    .min(1, "Harga bahan bakar harus diisi")
    .regex(/^\d+(\.\d+)?$/, "Harga bahan bakar harus berupa angka positif")
    .regex(/^(?!0+(\.0)?$).+$/, "Harga bahan bakar harus lebih besar dari nol")
    .transform(Number),
});

const BiayaBahanBakar = () => {
  // State untuk menyimpan hasil perhitungan dan status
  const [konsumsiBBM, setKonsumsiBBM] = useState(0);
  const [jarakPerjalanan, setJarakPerjalanan] = useState(0);
  const [hargaBBM, setHargaBBM] = useState(0);
  const [biayaTotal, setBiayaTotal] = useState(0);
  const [sdhDihitung, setSdhDihitung] = useState(false);

  // Inisialisasi form menggunakan useForm dari @tanstack/react-form
  const form = useForm({
    defaultValues: {
      konsumsiBBM: "",
      jarakPerjalanan: "",
      hargaBBM: "",
    },
    validators: { onSubmit: formSchema },
    onSubmit: ({ value }) => {
      console.log(value);
      const konsumsi = Number(value.konsumsiBBM);
      const jarak = Number(value.jarakPerjalanan);
      const harga = Number(value.hargaBBM);

      // Rumus biaya bahan bakar = konsumsi per km * jarak * harga per liter
      const totalLiter = jarak / konsumsi;
      const totalBiaya = totalLiter * harga;

      console.log("Konsumsi BBM per km:", konsumsi, "liter/km");
      console.log("Jarak Perjalanan:", jarak, "km");
      console.log("Harga BBM per liter:", harga, "Rp");
      console.log("Total Biaya:", totalBiaya, "Rp");

      setKonsumsiBBM(konsumsi);
      setJarakPerjalanan(jarak);
      setHargaBBM(harga);
      setBiayaTotal(totalBiaya);
      setSdhDihitung(true);
    },
  });

  // Fungsi untuk memformat angka ke format mata uang Rupiah
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(angka);
  };

  // Fungsi untuk memformat angka dengan desimal opsional
  const formatNumber = (angka: number) => {
    return angka.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Kalkulator Biaya Bahan Bakar Perjalanan</CardTitle>
          <CardDescription>
            Hitung estimasi biaya bahan bakar yang diperlukan untuk perjalanan
            Anda.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form
            id="biaya-bbm-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Field untuk rata-rata pemakaian bahan bakar per km */}
              <form.Field name="konsumsiBBM">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Rata-rata Pemakaian Bahan Bakar per km
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Contoh: 0.1 (liter/km)"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Masukkan rata-rata konsumsi bahan bakar dalam liter per
                        kilometer (liter/km). Contoh: Mobil efisien ~0.05-0.1
                        liter/km
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Field untuk rencana jarak perjalanan */}
              <form.Field name="jarakPerjalanan">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Rencana Jarak Perjalanan
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Contoh: 200 (km)"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Masukkan total jarak perjalanan dalam kilometer (km).
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Field untuk harga bahan bakar per liter */}
              <form.Field name="hargaBBM">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Harga Bahan Bakar per Liter
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Contoh: 10000 (Rupiah)"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Masukkan harga bahan bakar per liter dalam Rupiah (Rp).
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <Separator />

        {/* Menampilkan hasil perhitungan jika sudah dihitung */}
        {sdhDihitung && (
          <>
            <div className="px-6 text-orange-700">
              <h1 className="font-semibold mb-3">Rincian Perjalanan</h1>
              <p className="mb-2">
                • Konsumsi BBM: {formatNumber(konsumsiBBM)} liter/km
              </p>
              <p className="mb-2">
                • Jarak Perjalanan: {formatNumber(jarakPerjalanan)} km
              </p>
              <p className="mb-3">
                • Harga BBM: {formatRupiah(hargaBBM)}/liter
              </p>
              <h2 className="font-bold text-lg mt-4 pt-2 border-t-2 border-orange-200">
                Total Biaya Bahan Bakar: {formatRupiah(biayaTotal)}
              </h2>
              <p className="text-sm text-orange-600 mt-2">
                *Biaya dihitung dari: {formatNumber(konsumsiBBM)} liter/km ×{" "}
                {formatNumber(jarakPerjalanan)} km × {formatRupiah(hargaBBM)} ={" "}
                {formatRupiah(biayaTotal)}
              </p>
            </div>
            <Separator />
          </>
        )}

        <CardFooter className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setSdhDihitung(false);
            }}
          >
            Reset
          </Button>
          <Button type="submit" form="biaya-bbm-form">
            Hitung Biaya Perjalanan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BiayaBahanBakar;
