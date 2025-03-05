from fastapi import FastAPI, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI()

# Configura el sistema de plantillas Jinja2
templates = Jinja2Templates(directory="templates")

# Define una clase de modelo para el formulario
class Item(BaseModel):
    nombre: str
    descripcion: str = None
    precio: float
    impuestos: float = None

# Ruta para mostrar el formulario
@app.get("/", response_class=HTMLResponse)
def mostrar_formulario(request: Request):
    return templates.TemplateResponse("formulario.html", {"request": request})

# Ruta para procesar el formulario
@app.post("/procesar_formulario/")
async def procesar_formulario(item: Item):
    # Imprime los datos en la consola del servidor
    print("Datos recibidos:", item.dict())
    return {"mensaje": "Formulario recibido", "item": item}




