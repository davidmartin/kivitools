"use client";

import { Button, Card } from "@heroui/react";

export default function ExampleButton() {
  return (
    <Card className="p-6 max-w-md">
      <Card.Header>
        <Card.Title>Componente Interactivo de HeroUI</Card.Title>
        <Card.Description>
          Este componente usa interactividad del lado del cliente
        </Card.Description>
      </Card.Header>
      <Card.Content className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <Button onPress={() => console.log("¡Botón primario presionado!")}>
            Primario
          </Button>
          <Button
            variant="secondary"
            onPress={() => console.log("¡Botón secundario presionado!")}
          >
            Secundario
          </Button>
          <Button
            variant="tertiary"
            onPress={() => console.log("¡Botón terciario presionado!")}
          >
            Terciario
          </Button>
          <Button
            variant="danger"
            onPress={() => console.log("¡Botón de peligro presionado!")}
          >
            Peligro
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
