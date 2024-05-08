const Form = require('../schemas/form.schema')

// Obtiene todos los formularios
const getAllForms = async (req, res) => {
    try {
        const allForms = await Form.find();
        res.json(allForms)
    } catch (error) {
        console.log('Failed to get forms:', error);
        res.status(500).json({ error: 'Failed to get forms' });
    }
};

// Obtiene un formulario por su ID de MongoDB
const getForm = async (req, res) => {
    try {
        const { id } = req.params;
        const formFound = await Form.findById(id);
        if (!formFound) {
            return res.status(404).json({ error: 'Form not found' });
        }
        res.status(200).json(formFound)
    } catch (error) {
        console.log('Failed to get form:', error);
        res.status(500).json({ error: 'Failed to get form' })
    }
};

// Crea un nuevo formulario
const createForm = async (req, res) => {
    try {
        const { body } = req;
        const newForm = await Form.create({
            title: body.title,
            creationDateTime: new Date()
        });
        res.json(newForm)

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
        // Guarda fecha y hora de la última actualización
        req.body.editDateTime = new Date();
        const updatedForm = await Form.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );
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
            res.status(404).json({ error: 'Form not found' });
        }
        res.status(204).json();
    } catch (error) {
        console.log('Failed to delete form:', error);
        res.status(500).json({ error: 'Failed to delete form' })
    }
};


module.exports = { getAllForms, getForm, createForm, updateForm, deleteForm };
