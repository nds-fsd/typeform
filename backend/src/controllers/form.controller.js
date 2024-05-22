const Form = require('../schemas/form.schema');
const { Question } = require('../schemas/question.schema')

// Obtiene todos los formularios
const getAllForms = async (req, res) => {
    try {
        const allForms = await Form.find().populate('questions');
        res.json(allForms)
    } catch (error) {
        console.error('Failed to get forms:', error);
        res.status(500).json({ error: 'Failed to get forms' });
    }
};

// Obtiene un formulario por su ID de MongoDB
const getForm = async (req, res) => {
    try {
        const { id } = req.params;
        const formFound = await Form.findById(id).populate('questions');
        if (!formFound) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.status(200).json(formFound)
    } catch (error) {
        console.error('Failed to get form:', error);
        res.status(500).json({ error: 'Failed to get form' })
    }
};

// Crea un nuevo formulario
const createForm = async (req, res) => {
    try {
        const { body } = req;
        const questionsPromise = body.questions.map(async questionData => {
            const question = await Question.create(questionData);
            return question._id;
        });
        const questionsIds = await Promise.all(questionsPromise);
        // const { body } = req;
        const newForm = await Form.create({
            title: body.title,
            questions: questionsIds,
            creationDateTime: new Date()
        });
        res.status(201).json(newForm);

    } catch (error) {
        console.error('Failed to create form:', error);
        res.status(500).json({ error: 'Failed to create form' });
    }
};

// Actualiza un formulario existente
const updateForm = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        // get question _ids to access and update them
        const questionsPromise = body.questions.map(async questionData => {
            const question = await Question.create(questionData);
            return question._id;
        });
        const questionsIds = await Promise.all(questionsPromise);

        const updatedForm = await Form.findByIdAndUpdate(id, {
            questions: questionsIds,
            title: body.title,
            updateDateTime: new Date()
        },
            { new: true });

        if (!updatedForm) {
            return res.status(404).json({ error: 'Form not found' });
        };
        const updatedFormPopulated = await Form.findById(id).populate('questions');
        res.json(updatedFormPopulated)

    } catch (error) {
        console.error('Failed to update form:', error);
        res.status(500).json({ error: 'Failed to update form' });
    }
};

// Elimina un formulario existente
const deleteForm = async (req, res) => {
    try {
        const { id } = req.params;
        const formToDelete = await Form.findByIdAndDelete(id);
        if (!formToDelete) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.status(204).json();
    } catch (error) {
        console.error('Failed to delete form:', error);
        res.status(500).json({ error: 'Failed to delete form' })
    }
};


module.exports = { getAllForms, getForm, createForm, updateForm, deleteForm };
