const IDao = require('../IDao');
const { v4: uuidv4 } = require('uuid');

let instaciaMemory = null;

class MemoryDao extends IDao {
  constructor() {
    super();
    this.orders = [];
  }

  static getInstance() {
    if (!instaciaMemory) {
      instaciaMemory = new MemoryDao();
    }

    return instaciaMemory;
  }

  create(cliente, carrito) {
    let nuevaOrden = {
      id: uuidv4(),
      estado: 'generada',
      productos: carrito.map((e) => {
        return {
          id: uuidv4(),
          codigo: e.producto.codigo,
          nombre: e.producto.nombre,
          descripcion: e.producto.descripcion,
          precio: e.producto.precio,
          foto: e.producto.foto,
          cantidad: e.cantidad,
        };
      }),
      email: cliente.email,
      direccion: cliente.direccion,
      timestamp: new Date().toLocaleString(),
    };
    this.orders.push(nuevaOrden);
    return nuevaOrden;
  }

  read(query) {
    let ordenesCliente = this.orders.filter((e) => e.email == query.email);
    return ordenesCliente;
  }

  readId(id) {
    let orden = this.orders.filter((e) => e.id == id);
    return orden[0];
  }

  update(id, data) {
    let orden = this.orders.filter((p) => p.id == id);
    if (orden.length) {
      let ordenActualizada = Object.assign(orden[0], data);
      ordenActualizada.timestamp = new Date().toLocaleString();
      return ordenActualizada;
    } else {
      return false;
    }
  }

  delete(id) {
    let index = this.orders.findIndex((e) => e.id == id);
    if (index >= 0) {
      const ordenEliminada = this.orders.splice(index, 1);
      return ordenEliminada[0];
    } else {
      return false;
    }
  }
}

module.exports = MemoryDao;
