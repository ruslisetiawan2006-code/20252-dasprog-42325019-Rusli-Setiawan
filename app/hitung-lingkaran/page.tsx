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

const Page = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Kalkulasi Lingkaran</CardTitle>
          <CardDescription>Hitung luas dan keliling lingkaran</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <FieldGroup>
            <Field>
              <FieldLabel>Radius Lingkaran</FieldLabel>
              <Input />
              <FieldDescription>
                Masukkan radius lingkaran dalam satuan cm.
              </FieldDescription>
              <FieldError>
                Radius lingkaran harus berupa angka positif
              </FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
        <Separator />
        <CardFooter className="flex gap-2">
          <Button>Reset</Button>
          <Button variant="outline">Hitung Luas dan Keliling</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
