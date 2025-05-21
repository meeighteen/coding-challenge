package main

import (
	"api_go/routes"
	"log"

	_ "api_go/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/swagger"
	"github.com/joho/godotenv"
)

// @title API RESTful con Fiber
// @version 1.0
// @description Esta API maneja autenticación con JWT en Go usando Fiber.
// @host localhost:3000
// @BasePath /api
func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error cargando .env")
	}

	// Crear instancia de Fiber
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "https://app-vue-fe-46101751761.us-central1.run.app, http://localhost:5173",
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
	}))

	// Ruta para Swagger
	app.Get("/swagger/*", swagger.HandlerDefault)

	// Configurar rutas
	routes.SetupRoutes(app)

	// Iniciar servidor
	log.Fatal(app.Listen(":3000"))
}
