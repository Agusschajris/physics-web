from fastapi import FastAPI
from pydantic import BaseModel
import matplotlib.pyplot as plt
import numpy as np
import io
import base64
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI
app = FastAPI()

# Allow Naxt.js to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)


# Data the frontEnd will send
class UMInputs(BaseModel):
    x_i: float
    v: float
    t_i: float
    t_f: float


# Define POST endpoint that will send the graph
@app.post("/UM")
def UM(data: UMInputs):
    def f_UM(t, t_i, x_i, v):  # UM equation
        return x_i + v * (t - t_i)

    t = np.linspace(data.t_i, data.t_f, 100)
    x = f_UM(t, data.t_i, data.x_i, data.v)

    plt.figure()
    plt.plot(t, x, color='red')
    plt.xlabel("Time")
    plt.ylabel("Position")
    plt.title("Uniform Motion")
    plt.grid(linestyle='dashed')

    # Convert graph to base64 to send it
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    graph = base64.b64encode(buf.read()).decode("utf-8")
    plt.close()

    return {"graph": graph}
