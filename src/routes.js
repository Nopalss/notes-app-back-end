const { addNoteHandler, getAllNotesHandler, getNoteByIdhHandler, editNoteByIdHandler,deleteNoteByIdHandler } = require('./handler.js');

const routes = [
  {
    // objek route ini buat create catatan
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    options: {
      cors: {
        origin: ['*'],
      }
    }
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdhHandler
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteByIdHandler
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;