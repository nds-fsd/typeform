const Form = require('../schemas/form.schema')

const getAllForms = async (req, res) => {
    try {
        const allForms = await Form.find();
        res.json(allForms)
    } catch (error) {
        console.log('Failed to get forms:', error);
        res.status(500).json({ error: 'Failed to get forms' });
    }
    // // alternativa .then .catch para lidar com a promise
    // await Form.find()
    //     .then(allForms => { res.json(allForms) })
    //     .catch(error => {
    //         console.log('Failed to get forms:', error);
    //         res.status(500).json({ error: 'Failed to get forms' })
    //     })
};

const getForm = async (req, res) => {
    try {
        const formFound = await Form.findById(req.params.id);
        if (!formFound) {
            res.status(404).json({ error: 'Form not found' });
        }
        res.status(200).json(formFound)
    } catch (error) {
        console.log('Failed to get form:', error);
        res.status(500).json({ error: 'Failed to get form' })
    }
};

const createForm = async (req, res) => {
    try {
        const newForm = await Form.create(req.body);
        res.json(newForm)

    } catch (error) {
        console.error('Failed to create form:', error);
        res.status(500).json({ error: 'Failed to create form' });
    }
};

const updateForm = async (req, res) => {
    try {
        // armazena el datetime de la última edición
        req.body.editDateTime = new Date();
        const updatedForm = await Form.findByIdAndUpdate(
            req.params.id, req.body,
            {
                new: true,
            }
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

const deleteForm = async (req, res) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(req.params.id);
        if (!deletedForm) {
            res.status(404).json({ error: 'Form not found' })
        }
    } catch (error) {
        console.log('Failed to delete form:', error);
        res.status(500).json({ error: 'Failed to delete form' })
    }
};


module.exports = { getAllForms, getForm, createForm, updateForm, deleteForm };