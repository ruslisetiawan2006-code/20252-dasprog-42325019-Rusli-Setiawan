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
    .regex(/^-?\d+(\.\d+)?$/, "Radius lingkaran harus berupa angka")
    .regex(/^[^-]/, "Radius lingkaran harus berupa angka positif")
    .regex(/^(?!0+(\.0+)?$.+$)/, "Radius lingkaran harus lebih besar dari nol")
    .transform(Number),
});

const HitungLingkaran = () => {
  //State (kondisi atau status) untuk menyimpan hasil perhitungan luas dan keliling serta status apakah sudah dihitung atau belum
  const [radius, setRadius] = useState("");
  const [luas, setLuas] = useState(0);
  const [keliling, setKeliling] = useState(0);
  const [sdhDihitung, setSdhDihitung] = useState(false);

  //Inisialisasi form
  const form = useForm({
    //Menentukan default values untuk masing-masing field dalam formulir.
    defaultValues: { radius: "" },
    //Menentukan validasi untuk setiap field dalam formulir menggunakan Zod.
    validators: { onSubmit: formSchema },
    //Menentukan fungsi yangbakan dipanggil ketika formulor diSubmit.
    onSubmit: () => {},
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
              e.preventDefault();
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
        <CardFooter className="flex gap-2">
          <Button>Reset</Button>
          <Button type="submit" form="hitung-lingkaran-form" variant="outline">
            Hitung Luas dan Keliling
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HitungLingkaran;
