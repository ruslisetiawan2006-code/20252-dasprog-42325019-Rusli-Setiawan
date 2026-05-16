import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";

const CardDemo = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-2/3">
        <CardHeader>
          <CardTitle>Judul Card</CardTitle>
          <CardDescription>
            {" "}
            Deskripsi Card - ini adalah deskripsi dari card
          </CardDescription>
          <CardAction>
            <Badge variant="destructive">
              <BadgeCheck data-icon="inline-start" />
              Badge
            </Badge>
          </CardAction>
        </CardHeader>
        <Separator />
        <CardContent>
          <h1 className="font-bold">Isi card</h1>
          <p>
            ini adalah isi dari card, bisa berisi teks, gambar, atau komponen
            lainnya.
          </p>
        </CardContent>
        <Separator />
        <CardFooter className="flex gap-2">
          <Button>Button 1</Button>
          <Button size="lg" variant="outline">
            Button 2
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CardDemo;
