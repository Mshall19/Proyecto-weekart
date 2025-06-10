import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send } from "lucide-react";

const Foro = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="bg-white shadow-xl rounded-2xl p-6">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" /> Foro de Discusión
          </h2>
          <form className="space-y-4">
            <Input placeholder="Título del tema" className="text-base" />
            <Textarea rows={4} placeholder="Escribe tu mensaje aquí..." className="text-base" />
            <Button type="submit" className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Publicar
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {[1, 2, 3].map((id) => (
          <Card key={id} className="bg-gray-50 shadow-sm rounded-xl p-4">
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Título de la publicación #{id}</h3>
              <p className="text-gray-700 text-sm">
                Este es un mensaje de ejemplo del foro. Aquí irá el contenido publicado por los usuarios.
              </p>
              <p className="text-xs text-gray-400">Publicado hace 5 minutos</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Foro;
