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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";

// Schema Validasi Zod
const formSchema = z.object({
  jumlah: z
    .string()
    .min(1, "Jumlah software harus diisi")
    .regex(/^\d+$/, "Jumlah harus berupa angka bulat positif")
    .regex(/^[1-9]\d*$/, "Jumlah harus minimal 1 buah"),
  sistemOperasi: z.string().min(1, "Pilih salah satu sistem operasi"),
});

interface TransaksiSoftware {
  id: number;
  tglPembelian: string;
  jumlah: number;
  sistemOperasi: string;
  hrgPerangkatLunak: number;
  pajak: number;
  biayaPengiriman: number;
  totalHarga: number;
}

const HARGA_PER_UNIT = 350000;
const BIAYA_KIRIM_PER_UNIT = 12500;
const PAJAK_PERSEN = 0.07;

const PenjualanSoftware = () => {
  const [hasil, setHasil] = useState<TransaksiSoftware | null>(null);

  // Inisialisasi Form
  const form = useForm({
    defaultValues: {
      jumlah: "",
      sistemOperasi: "",
    },
    validators: { onSubmit: formSchema },
    onSubmit: ({ value }) => {
      const jumlah = Number(value.jumlah);

      // Perhitungan sesuai spesifikasi UAS
      const hrgPerangkatLunak = jumlah * HARGA_PER_UNIT;
      const pajak = hrgPerangkatLunak * PAJAK_PERSEN;
      const biayaPengiriman = jumlah * BIAYA_KIRIM_PER_UNIT;
      const totalHarga = hrgPerangkatLunak + pajak + biayaPengiriman;

      const dataBaru: TransaksiSoftware = {
        id: Date.now(),
        tglPembelian: new Date().toISOString(),
        jumlah,
        sistemOperasi: value.sistemOperasi,
        hrgPerangkatLunak,
        pajak,
        biayaPengiriman,
        totalHarga,
      };

      setHasil(dataBaru);
    },
  });

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Kalkulator Penjualan Software</CardTitle>
          <CardDescription>
            Hitung sub-total, pajak, biaya pengiriman, dan total biaya lisensi
            software.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <form
            id="penjualan-software-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              {/* Field Jumlah Software */}
              <form.Field name="jumlah">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Jumlah Software (Buah)
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Contoh: 5"
                        autoComplete="off"
                      />
                      <FieldDescription>
                        Harga per unit software: Rp 350.000
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Field Sistem Operasi (Dropdown) */}
              <form.Field name="sistemOperasi">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Jenis Sistem Operasi
                      </FieldLabel>
                      <Select
                        value={field.state.value}
                        onValueChange={(val) => field.handleChange(val)}
                      >
                        <SelectTrigger id={field.name}>
                          <SelectValue placeholder="Pilih Sistem Operasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Linux">Linux</SelectItem>
                          <SelectItem value="Windows 64 bit">
                            Windows 64 bit
                          </SelectItem>
                          <SelectItem value="MacOS">MacOS</SelectItem>
                        </SelectContent>
                      </Select>
                      <FieldDescription>
                        Pilih sistem operasi yang sesuai dengan kebutuhan.
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

        {/* Ringkasan Hasil */}
        {hasil && (
          <>
            <div className="p-6 bg-slate-50 dark:bg-slate-900">
              <h3 className="font-bold text-lg mb-4 text-primary">
                Rincian Pembayaran
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Jumlah Perangkat Lunak:
                  </span>
                  <span className="font-medium">{hasil.jumlah} buah</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sistem Operasi:</span>
                  <span className="font-medium">{hasil.sistemOperasi}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Sub-Total Harga:
                  </span>
                  <span className="font-medium">
                    {formatRupiah(hasil.hrgPerangkatLunak)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pajak (7%):</span>
                  <span className="font-medium">
                    {formatRupiah(hasil.pajak)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Biaya Pengiriman:
                  </span>
                  <span className="font-medium">
                    {formatRupiah(hasil.biayaPengiriman)}
                  </span>
                </div>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between font-bold text-base text-emerald-600">
                <span>Total Pembayaran:</span>
                <span>{formatRupiah(hasil.totalHarga)}</span>
              </div>
            </div>
            <Separator />
          </>
        )}

        <CardFooter className="flex gap-2 justify-end pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
              setHasil(null);
            }}
          >
            Reset
          </Button>
          <Button type="submit" form="penjualan-software-form">
            Hitung Total Pembayaran
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PenjualanSoftware;
