const { Schema, model } = require('mongoose');

const formSchema = new Schema({
    title: {
        type: String,
        // podemos usar "My form" como default title si el user 
        // no le asigna uno en la creación, pero no aqui, 
        // sino en el frontend, como placeholder del input respectivo
        //default: 'My form'
        require: true
    },
    // a depender de cuales serán los estados, adaptar aqui o en frontend
    status: String,
    creationDateTime: {
        type: Date,
        default: new Date(),
        immutable: true
    },
    editDateTime: {
        type: Date,
        // quizá sea útil registrar hora de la última edición(?)
        default: new Date()
    },
    questions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Question'
        }
    ]
});

const Form = model('Form', formSchema);

module.exports = Form;