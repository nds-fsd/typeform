// const { Schema, model } = require('mongoose');

// // const questionSchema = new Schema({
// //     type: ["number", "string", "boolean"],
// //     text: String
// // });

// const options = { discriminatorKey: 'type' };

// const questionsSchema = new Schema({ text: String }, options);
// const Question = model('Question', questionsSchema);

// let test = await Question.create({text: 'new question'});
// console.log(test, 'created')
// const YesNoQuestion = Question.discriminator('YesNo', new Schema({ answer: { type: Boolean, required: true } }));

// const yesNo = new YesNoQuestion({ text: 'testing schema design possibilities', answer: true }); // equals yes in frontend
// await yesNo.save();

// assert.ok(yesNo.answer);

// // original:

// // const questionSchema = new Schema({
// //     text: String
// // });
// //enum de tipos acceptados 
// //schema question y d equestion option (probaablemente)
// // p form y cada tipo de question, tenes la plantilla(template) y las instancias, las generadas por cada usuario q le repsonde 
// //a un form y a una question.
// // q se apuede significar otro tipo de schema

// const flexibleQuestion = new Schema(
//     {
//         "questionType": "text",
//         "questionText": "What is your name?",
//         "required": true
//     },
//     {
//         "questionType": "number",
//         "questionText": "How old are you?",
//         "required": false
//     },
//     {
//         "questionType": "checkbox",
//         "questionText": "Which programming languages do you know?",
//         "options": ["JavaScript", "Python", "Java"],
//         "required": true
//     }
// );

// const nestedQuestions = new Schema(
//     {
//         type: Date,
//         count: 1, // quiero poder armazenar contagem desde la primera q ha creado el usuairo en i from
//         text: {
//             type: Date
//         }
//     },
//     {
//         "questionType": "number",
//         "questionText": "How old are you?",
//         "required": false
//     },
//     {
//         "questionType": "checkbox",
//         "questionText": "Which programming languages do you know?",
//         "options": ["yes", "no"], // o uso true false y en frontend q se renderize como Yes No?
//         "required": true
//     }
// );

// //const Question = model('Question', questionSchema);

// module.exports = Question;

// question.schema.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const baseOptions = {
    discriminatorKey: 'type', // Chave de discriminação
    collection: 'questions',
};

const questionSchema = new Schema({
    text: {
        type: String,
        required: true
    }
}, baseOptions);

const Question = mongoose.model('Question', questionSchema);

const yesNoQuestionSchema = new Schema({
    answer: {
        type: Boolean,
        required: false
    }
});

const YesNoQuestion = Question.discriminator('yes_no', yesNoQuestionSchema);

// Criando uma instância diretamente (apenas para exemplo)
const yesNoQuestion = new YesNoQuestion({
    text: "Is the sky blue?",
    answer: true
});

// Salvando a instância no banco de dados
yesNoQuestion.save().then(() => console.log('Yes/No Question Saved'));

// Exportando o modelo para uso em outras partes da aplicação
module.exports = {
    Question,
    YesNoQuestion,
    // Outros modelos discriminadores...
};