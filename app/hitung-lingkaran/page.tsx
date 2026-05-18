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
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import z from "zod";
import { useForm } from "@tanstack/react-form";
//validasi formulir menggunakan zod untuk memastikan input adalah angka positif
const formSchema = z.object({
  radius: z
    .string()
    .min(1, "Radius lingkaran harus diisi")
    .regex(/^\d+(\.\d+)?$/, "Radius harus angka positif")
    .regex(/^(?!0+(\.0+)?$)\d+(\.\d+)?/, "Radius tidak boleh nol")
    .transform(Number),
});

const HitungLingkaran = () => {
  //State (kondisi atau status) untuk menyimpan hasil perhitungan luas dan keliling
  // serta status apakah sudah dihitung atau belum
  const [radius, setRadius] = useState(0);
  const [luas, setLuas] = useState(0);
  const [keliling, setKeliling] = useState(0);
  const [sdhDihitung, setSdhDihitung] = useState(false);

  //Inisialisasi form menggunakan useForm dari @tanstack/react-form dengan
  //konfigurasi default values, validators, dan onSubmit handler
  const form = useForm({
    //Menentukan default values untuk masing-masing field dalam formulir.
    defaultValues: { radius: "" },
    //Menentukan validasi untuk setiap field dalam formulir menggunakan Zod.
    validators: { onBlur: formSchema },
    //Menentukan fungsi yang akan dipanggil ketika formulor diSubmit.
    onSubmit: ({ value }) => {
      console.log(value);
      const r = Number(value.radius);
      //mengambil nilai dari form dan
      //mengkonvesikannya menjadi angka
      const hitungLuas = Math.PI * r * r; //rumus luas lingkaran: nr2
      const hitungKeliling = 2 * Math.PI * r; //rumus keliling lingkaran: 2nr
      console.log("Luas Lingkaran:", "hitungKeliling");
      console.log("Keliling Lingkaran", "hitungKeliling");
      setRadius(r);
      setLuas(hitungLuas);
      setKeliling(hitungKeliling);
      setSdhDihitung(true); //Menandakan bahwa perhitungan sudah dilakukan
    },
  });
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Kalkulasi Lingkaran</CardTitle>
          <CardDescription>Hitung luas dan keliling lingkaran</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <form
            id="hitung-lingkaran-form"
            onSubmit={(e) => {
              e.preventDefault(); //Mencegah perilaku default form submit yang akan me-refresh halaman
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="radius">
                {(field) => {
                  //Menentukan apakah field radius sudah disentuh (touched) dan valid atau tidak
                  //untuk menampilkan pesan error jika input tidak valid
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Radius Lingkaran
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Masukan radius lingkaran dalam cm"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Masukkan radius lingkaran dalam satuan cm.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        ></FieldError>
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <Separator />
        {sdhDihitung && (
          <>
            <div className="px-6 text-orange-700">
              <h1 className="font-semibold mb-3">
                Hasil Kalkulasi Lingkaran Radius{" "}
                {radius.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                cm
              </h1>
              <p>
                {/* Luas: {luas.toFixed(2)} cm<sup>2</sup>, Keliling: {keliling.toFixed(2)} cm */}
                Luas:{" "}
                {luas.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                cm<sup>2</sup>, Keliling:{" "}
                {keliling.toLocaleString("id-ID", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                cm
              </p>
            </div>
            <Separator />
          </>
        )}
        <CardFooter className="flex gap-2">
          <Button
            type="button"
            onClick={() => {
              form.reset();
              setSdhDihitung(false);
            }}
          >
            Reset
          </Button>
          <Button type="submit" form="hitung-lingkaran-form" variant="outline">
            Hitung Luas dan Keliling
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HitungLingkaran;
