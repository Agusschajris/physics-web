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
# Uniform Motion
class UMInputs(BaseModel):
    x_i: float
    v: float
    t_i: float
    t_f: float
    only_positive: bool = False


# Constant Acceleration
class CAInputs(BaseModel):
    x_i: float
    v_i: float
    a: float
    t_i: float
    t_f: float
    only_positive: bool = False


# Define POST endpoints that will send the graph
# Uniform Motion
@app.post("/UM")
def UM(data: UMInputs):
    def f_UM(t, t_i, x_i, v):  # UM equation
        return x_i + v*(t-t_i)

    t = np.linspace(data.t_i, data.t_f, 100)
    x = f_UM(t, data.t_i, data.x_i, data.v)

    # If only_positive=True, deleting negative position values from x and t
    if data.only_positive:
        mask = (x >= 0) & (t >= 0)
        t = t[mask]
        x = x[mask]

    plt.figure()
    plt.plot(t, x, color='blueviolet')
    plt.xlabel("Time")
    plt.ylabel("Position")
    plt.title("Uniform Motion")
    plt.grid(linestyle='dashed')

    # Converting graph to base64 to send it
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    graph = base64.b64encode(buf.read()).decode("utf-8")
    plt.close()

    return {"graph": graph}


# Constant Acceleration
@app.post("/CA")
def CA(data: CAInputs):
    # Position graph
    def f_CA_pos(t, t_i, x_i, v_i, a):
        return x_i + v_i*(t-t_i) + 0.5*a*(t-t_i)**2  # equation

    t = np.linspace(data.t_i, data.t_f, 100)
    x = f_CA_pos(t, data.t_i, data.x_i, data.v_i, data.a)

    # If only_positive=True, deleting negative position values from x and t
    if data.only_positive:
        mask = (x >= 0) & (t >= 0)
        t = t[mask]
        x = x[mask]

    plt.figure()
    plt.plot(t, x, color='blueviolet')
    plt.xlabel("Time")
    plt.ylabel("Position")
    plt.title("Constant Acceleration (position vs time)")
    plt.grid(linestyle='dashed')

    # Convert graph to base64 to send it
    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    graph_pos = base64.b64encode(buf.read()).decode("utf-8")
    plt.close()

    # Velocity graph
    def f_CA_vel(t, t_i, v_i, a):
        return v_i + a*(t-t_i)  # equation

    # t = np.linspace(data.t_i, data.t_f, 100) --> no need to re-calculate t
    v = f_CA_vel(t, data.t_i, data.v_i, data.a)

    plt.figure()
    plt.plot(t, v, color='blueviolet')
    plt.xlabel("Time")
    plt.ylabel("Velocity")
    plt.title("Constant Acceleration (velocity vs time)")
    plt.grid(linestyle='dashed')

    buf = io.BytesIO()
    plt.savefig(buf, format="png")
    buf.seek(0)
    graph_vel = base64.b64encode(buf.read()).decode("utf-8")
    plt.close()

    return {"graph_pos": graph_pos, "graph_vel": graph_vel}
