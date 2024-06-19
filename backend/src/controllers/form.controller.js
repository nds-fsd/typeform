const Form = require('../schemas/form.schema');

// Obtiene todos los formularios
const getAllForms = async (req, res) => {
    try {
        const user = req.user;
        const allForms = await Form.find({owner:user._id}).populate('questions');
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
        const user = req.user;
        const newForm = await Form.create({
            title: body.title,
            status: body.status,
            questions: body.questions,
            creationDateTime: new Date(),
            owner: user._id
        });
        res.status(200).json(newForm);

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

        const updatedForm = await Form.findByIdAndUpdate(id, body, { new: true });

        if (!updatedForm) {
            return res.status(404).json({ error: 'Form not found' });
        }

        res.json(updatedForm)

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
        res.status(204).json(formToDelete);
    } catch (error) {
        console.error('Failed to delete form:', error);
        res.status(500).json({ error: 'Failed to delete form' });
    }
};

module.exports = { getAllForms, getForm, createForm, updateForm, deleteForm };
