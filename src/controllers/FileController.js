const File = require('../model/File');
const Box = require('../model/Box');

class FileController {
   async store(req, res){
        // Consulta a box por id
       const box = await Box.findById(req.params.id);
         // Cria um novo objeto File com os dados recebidos na requisição.
       const file = await File.create({
           title: req.file.originalname,
           path: req.file.key,
       });

       // Inclui o file na box
       box.files.push(file);
       // Persiste os dados no banco
       await box.save();
       // Notifica os clients conectados na box
       req.io.sockets.in(box._id).emit('file', file)
       // Retorna o objeto file criado para o cliente
       return res.json(file);
   }
}

module.exports = new FileController();