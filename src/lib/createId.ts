let id: number = parseInt(window.localStorage.getItem('_id_Max') || '0') || 0;

function createId() {
  id++;
  window.localStorage.setItem('_id_Max', id.toString());
  return id;
}

export default createId;