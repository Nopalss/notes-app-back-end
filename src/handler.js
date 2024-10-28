const { nanoid } = require('nanoid');
const notes = require('./notes.js');

// ini fungsi untuk membuat catatan
const addNoteHandler = (request, h) => {
  // 1. kita ambil data yang ada di body request
  const { title, tags, body } = request.payload;
// 2. membuat id unique, tanggal create
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updateAt = createdAt;
// 3. mengumpulkan atribut dan disimpan menjadi satu
  const newNote = {
    title, tags, body, id, createdAt, updateAt
  };
// 4. mengepush catatan baru ke catatan
  notes.push(newNote);
// 5. mengecek apakah succes catatan di simpan
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    // jika sukses maka lakukan ini
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
// ini jika gagal
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan'
  });

  response.code(500);
  return response;

};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  },
});

const getNoteByIdhHandler = (request, h) => {
  const {id} = request.params;

  const note = notes.filter((note) => note.id === id)[0]

  if(note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      }
    }
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  });
  response.code(404);

  return response;

};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  // ini ngecek apakah ada id note ini di notes jika ada akan mengembalikan index nya jika tidak maka akan mengembalikan -1 
  const index = notes.findIndex((note) => note.id === id);

  if(index !== -1){
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    }
    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil Diperbarui'
    });

    response.code(200);

    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui Catatan, Id Tidak ditemukan'
  });
  response.code(404);
  return response;

}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id );

  if(index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil dihapus'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui Catatan, Id Tidak ditemukan'
  });
  response.code(404);
  return response;

}
module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdhHandler, editNoteByIdHandler, deleteNoteByIdHandler };